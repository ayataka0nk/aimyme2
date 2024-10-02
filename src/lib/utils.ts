import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatInTimeZone } from 'date-fns-tz'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type FormattedDate<T> = T extends Date ? string : string | undefined
export const toUtcIsoString = <T extends Date | undefined>(
  date: T
): FormattedDate<T> => {
  if (typeof date === 'undefined') {
    return undefined as FormattedDate<T>
  }

  return formatInTimeZone(date, 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'")
}
