'use server'

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { getSessionOrFail } from '@/lib/sessions'
import { notFound, redirect } from 'next/navigation'

export const upsertTimeEntry = async (
  timeEntryId: string | undefined,
  _currentState: unknown,
  formData: FormData
) => {
  const projectId = formData.get('projectId') as string
  const description = formData.get('description') as string
  const yearMonth = formData.get('yearMonth') as string
  const startDate = formData.get('startDate') as string
  const startTime = formData.get('startTime') as string
  const endDate = formData.get('endDate') as string
  const endTime = formData.get('endTime') as string

  try {
    if (timeEntryId) {
      throw new Error('Not implemented')
    } else {
      throw new Error('Not implemented')
    }
  } catch {
    return {
      error: 'unknown error'
    }
  }
}
