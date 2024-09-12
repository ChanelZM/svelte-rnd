import { text, type TextKey } from "./text";

export function mapObject<T extends Record<string, any>, U>(
    object: T,
    mapFn: (val: T[keyof T]) => U
): Record<string, U> {
    return Object.keys(object)
        .map((key) => ({ [key]: mapFn(object[key as keyof T]) }))
        .reduce((prev, curr) => ({ ...prev, ...curr }));
}

const texts = { ...text };
const strings: { [key: string]: string } = mapObject(texts, (val) =>
    val.replace(/\\n/g, "\n")
);

export const localize = (
    key: TextKey,
    variablesObj?: Record<string, string | number>
): string => {
    let translation = lookup(key);
    if (variablesObj) {
        translation = replaceVariables(translation, variablesObj);
    }
    return translation;
};

function replaceVariables(
    originalTranslation: string,
    variablesObj: Record<string, string | number>
): string {
    let translation = originalTranslation;
    Object.entries(variablesObj).forEach(([key, value]) => {
        translation = translation.replace(`{${key}}`, `${value}`);
    });
    return translation;
}

function lookup(key: TextKey): string {
    const translation = strings[key as TextKey];
    if (translation) {
        return translation;
    }
    // log.warn('text util', `Missing key: ${key}`);
    return key;
}
