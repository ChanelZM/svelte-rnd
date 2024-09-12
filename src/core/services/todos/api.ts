import { error, type NumericRange } from "@sveltejs/kit";
import type { Params } from "$utils/buildUrl";
import buildUrl from "$utils/buildUrl";
import type {
  ApiDeleteRequest,
  ApiDeleteResponse,
} from "./dtoTypes/api-delete";
import type { ApiGetResponse } from "./dtoTypes/api-get";
import type { ApiPatchRequest, ApiPatchResponse } from "./dtoTypes/api-patch";
import type { ApiPostRequest, ApiPostResponse } from "./dtoTypes/api-post";
import type { ApiPutRequest, ApiPutResponse } from "./dtoTypes/api-put";

const endpoint = import.meta.env.VITE_MOCK_API_ENDPOINT;

export type RequestConfig = RequestInit & {
  params?: Params;
  fetch?: typeof fetch;
  ssrCache?: number;
};
const responses = new WeakMap<any, Response>();

async function wrapped<T>(
  method: RequestInit["method"],
  path: string,
  config: RequestConfig,
): Promise<any> {
  // eslint-disable-next-line prefer-const
  let { ssrCache, fetch, params, ...init } = config;
  params = params || {};
  if (!fetch) {
    if (typeof window === "undefined") {
      throw new Error("Missing config.fetch");
    }
    fetch = window.fetch;
  }
  if (ssrCache && typeof window === "undefined") {
    init.headers = new Headers(init.headers);
    init.headers.append("SSR-Cache", `${ssrCache}`);
  }
  init.method = method;
  const url = endpoint + buildUrl(path, params);
  const start = Date.now();
  let response: Response;
  try {
    response = await fetch(url, init);
  } catch (err: any) {
    if (err.message) {
      throw new Error(`${method} ${url} failed: ${err.message}`);
    }
    throw err;
  }
  const duration = (Date.now() - start) / 1000;
  if (duration > 1) {
    console.info(
      `${method} ${url.substring(endpoint.length)} took ${duration.toFixed(
        3,
      )}s`,
    );
  }
  if (!response.ok) {
    try {
      error(
        response.status as NumericRange<400, 599>,
        `${method} ${url} failed: ${response.status} ${response.statusText}`,
      );
    } catch (err) {
      responses.set(err, response);
      throw err;
    }
  }

  // Note: If the api is allowed to return empty or non-json content, this check should be tweaked or removed.
  if (!response.headers.get("Content-Type")?.startsWith("application/json")) {
    const err = new Error(
      `${method} ${url} failed: Missing 'Content-Type: application/json' header`,
    );
    responses.set(err, response);
    throw err;
  }
  const data = (await response.json()) as T;
  if (config.signal && config.signal.aborted) {
    throw new Error("Aborted");
  }
  if (typeof data === "object" && data !== null) {
    responses.set(data, response);
  }
  return data;
}

const api = {
  get<T extends keyof ApiGetResponse>(
    path: T,
    config?: RequestConfig,
  ): Promise<ApiGetResponse[T]> {
    return wrapped<ApiGetResponse[T]>("GET", path, config || {});
  },

  async post<T extends keyof ApiPostRequest & keyof ApiPostResponse>(
    path: T,
    data: ApiPostRequest[T],
    config?: RequestConfig,
  ): Promise<ApiPostResponse[T]> {
    return wrapped<ApiPostResponse[T]>("POST", path, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },

  async patch<T extends keyof ApiPatchRequest & keyof ApiPatchResponse>(
    path: T,
    data: ApiPatchRequest[T],
    config?: RequestConfig,
  ): Promise<ApiPatchResponse[T]> {
    return wrapped("PATCH", path, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },

  async put<T extends keyof ApiPutRequest & keyof ApiPutResponse>(
    path: T,
    data: ApiPutRequest[T],
    config?: RequestConfig,
  ): Promise<ApiPutResponse[T]> {
    return wrapped("PUT", path, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },

  async delete<T extends keyof ApiDeleteRequest & keyof ApiDeleteResponse>(
    path: T,
    config?: RequestConfig,
  ): Promise<ApiDeleteResponse[T]> {
    return wrapped("DELETE", path, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "application/json",
      },
    });
  },
};
export default api;

function getResponse(dataOrError: unknown): Response | undefined {
  return responses.get(dataOrError);
}

export function getStatus(dataOrError: unknown): number | undefined {
  const response = getResponse(dataOrError);
  if (response) {
    return response.status;
  }
  return undefined;
}

export function getStatusText(dataOrError: unknown): string | undefined {
  const response = getResponse(dataOrError);
  if (response) {
    return response.statusText;
  }
  return undefined;
}

export function getHeader(
  dataOrError: unknown,
  name: string,
): string | undefined {
  const response = getResponse(dataOrError);
  if (response) {
    const value = response.headers.get(name);
    if (value !== null) {
      return value;
    }
  }
  return undefined;
}
