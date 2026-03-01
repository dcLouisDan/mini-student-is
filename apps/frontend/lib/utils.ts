import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function camelCaseToTitleCase(str: string) {
  const spaced = str.replace(/([A-Z])/g, ' $1')

  return spaced
    .replace(/^./, function (match) {
      return match.toUpperCase()
    })
    .trim()
}
