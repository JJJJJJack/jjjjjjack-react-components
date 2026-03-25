export type ObjectKey = string | number | symbol;

/** Union of all keys of T */
export type Keys<T> = keyof T;
/** Union of all value types of T */
export type Values<T> = T[keyof T];
/** Union of all [key, value] tuple types of T */
export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T];
