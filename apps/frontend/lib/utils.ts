import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from './dayjs'

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

export function dateToFormatedString(date: Date | string | undefined) {
  if (!date) return ''

  return dayjs(date).format('YYYY-MM-DD')
}
