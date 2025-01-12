import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// a pick function to pick the keys from the object
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;
    keys.forEach((key) => {
        result[key] = obj[key];
    });
    return result;
}
