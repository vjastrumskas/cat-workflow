import { useToaster } from '../stores/toastMsg.ts';

/**
 * Sets a value in localStorage.
 * @param key The key to store the value under.
 * @param value The value to store.
 */
export function setItem<T>(key: string, value: T): void {
  const toast = useToaster();
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // console.error(`Could not save data for key "${key}":`, error);
    // You can handle the error here (e.g., show a user-friendly message).
    toast.setToast(`Could not save data for key "${key}". Cause: ${error}`);
  }
}

/**
 * Retrieves a value from localStorage.
 * @param key The key to retrieve the value for.
 * @returns The stored value or null if not found.
 */
export function getItem<T>(key: string): T | null {
  const toast = useToaster();
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    toast.setToast(`Could not retrieve data for key "${key}". Cause: ${error}`);
    return null;
  }
}
