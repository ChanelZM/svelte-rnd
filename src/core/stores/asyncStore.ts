import { writable } from "svelte/store";

export type Error = {
  code: number;
  traceIdentifier: string;
  description: string;
};
type Status = "idle" | "pending" | "success" | "error";

export type AsyncStoreType<T> = {
  status: Status;
  error: Error | null;
  data: T | null;
};

function asyncStore<T>() {
  const { subscribe, update } = writable<AsyncStoreType<T>>({
    status: "idle",
    error: null,
    data: null,
  });
  let abortController: AbortController | null = null;

  const abort = () => {
    if (abortController) abortController.abort();
  };

  const setStatus = (status: Status) => {
    update((state) => ({ ...state, status }));
  };

  const setError = (error: Error | null) => {
    update((state) => ({ ...state, error }));
  };

  const setData = (data: T | null) => {
    update((state) => ({ ...state, data }));
  };

  const execute = async (asyncFunction: () => Promise<T>) => {
    if (abortController) abortController.abort();
    abortController = new AbortController();

    setStatus("pending");
    setError(null);

    await asyncFunction()
      .then((res) => {
        setStatus("success");
        setData(res);
      })
      .catch((err) => {
        // Request was aborted, ignore.
        if (err.name === "AbortError") return;
        setStatus("error");
        setError(JSON.parse(err.message));
      })
      .finally(() => {
        abortController = null;
      });
  };

  return {
    subscribe,
    setStatus,
    execute,
    abort,
  };
}

export default asyncStore;
