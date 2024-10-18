import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// artificial error
export function timeout() {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve()
      } else {
        reject(new Error("Oops! Error encountered. Cannot load posts."))
      }
    }, 300)
  })
}

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("ua-UA", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  })
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const storedValue = localStorage.getItem(key)
  const value = storedValue ? JSON.parse(storedValue) : initialValue
  const setValue = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
  }
  return { value, setValue }
}
