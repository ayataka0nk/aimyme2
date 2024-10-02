import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'
import { fromZonedTime, toZonedTime } from 'date-fns-tz'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type YearMonth = {
  year: number
  month: number
}

export type ParsedYearMonth<T> = T extends string
  ? {
      year: number
      month: number
    }
  : {
      year?: number
      month?: number
    }

export const parseYearMonth = <T extends string | undefined>(
  yearMonth: T
): ParsedYearMonth<T> => {
  if (typeof yearMonth === 'undefined') {
    return {
      year: undefined,
      month: undefined
    } as ParsedYearMonth<T>
  }
  const [year, month] = yearMonth.split('-').map(Number)
  return { year, month }
}

export const formatYearMonth = (year: number, month: number) => {
  return `${year}-${String(month).padStart(2, '0')}`
}

export const calcPrevYearMonth = (year: number, month: number) => {
  if (month === 1) {
    return { year: year - 1, month: 12 }
  } else {
    return { year: year, month: month - 1 }
  }
}

export const calcNextYearMonth = (year: number, month: number) => {
  if (month === 12) {
    return { year: year + 1, month: 1 }
  } else {
    return { year: year, month: month + 1 }
  }
}

export const getCurrentYearMonth = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  return { year, month }
}

type ParsedDate<T> = T extends string ? Date : Date | undefined
export const parseIsoDate = <T extends string | undefined>(
  date: T
): ParsedDate<T> => {
  if (typeof date === 'undefined') {
    return undefined as ParsedDate<T>
  }
  return parseISO(date) as ParsedDate<T>
}

type MaybeUndefined<T> = T | undefined

type ParseUtcDateTimeResult<D, T> = D extends string
  ? T extends string
    ? Date
    : undefined
  : undefined

export const fromZonedTimeToUtc = <
  D extends MaybeUndefined<string>,
  T extends MaybeUndefined<string>
>(
  date: D,
  time: T,
  timeZone: string = 'Asia/Tokyo'
): ParseUtcDateTimeResult<D, T> => {
  if (typeof date === 'undefined' || typeof time === 'undefined') {
    return undefined as ParseUtcDateTimeResult<D, T>
  }

  const dateTimeStr = `${date} ${time}`
  const utcDateTime = fromZonedTime(dateTimeStr, timeZone)
  return utcDateTime as ParseUtcDateTimeResult<D, T>
}

export const getNowDate = () => {
  const now = new Date()
  return format(now, 'yyyy-MM-dd')
}

export const getNowYearMonth = () => {
  const now = new Date()
  return format(now, 'yyyy-MM')
}

export const formatToZonedDate = (
  date?: Date,
  timeZone: string = 'Asia/Tokyo'
) => {
  if (typeof date === 'undefined') {
    return ''
  }
  return format(toZonedTime(date, timeZone), 'yyyy-MM-dd')
}

export const formatToZonedTime = (
  date?: Date,
  timeZone: string = 'Asia/Tokyo'
) => {
  if (typeof date === 'undefined') {
    return ''
  }
  return format(toZonedTime(date, timeZone), 'HH:mm:ss')
}

export const formatToZonedDateTime = (
  date?: Date,
  timeZone: string = 'Asia/Tokyo'
) => {
  if (typeof date === 'undefined') {
    return ''
  }
  return format(toZonedTime(date, timeZone), 'yyyy-MM-dd HH:mm:ss')
}

export const formatToZonedDateTimeWithoutSeconds = (
  date?: Date,
  timeZone: string = 'Asia/Tokyo'
) => {
  if (typeof date === 'undefined') {
    return ''
  }
  return format(toZonedTime(date, timeZone), 'yyyy-MM-dd HH:mm')
}

export const formatToZonedOnlyDate = (
  date?: Date,
  timeZone: string = 'Asia/Tokyo'
) => {
  if (typeof date === 'undefined') {
    return ''
  }
  return format(toZonedTime(date, timeZone), 'd')
}

export const formatToZonedHourMinute = (
  date?: Date,
  timeZone: string = 'Asia/Tokyo'
) => {
  if (typeof date === 'undefined') {
    return ''
  }
  return format(toZonedTime(date, timeZone), 'HH:mm')
}

export function millisecondsToHours<T extends number | undefined>(
  milliseconds: T
): T extends number ? number : undefined {
  if (typeof milliseconds === 'number') {
    return parseFloat((milliseconds / 1000 / 60 / 60).toFixed(1)) as any
  }
  return undefined as any
}
