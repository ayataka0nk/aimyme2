'use server'

import { prisma } from '@/lib/prisma'
import { getSessionOrFail } from '@/lib/sessions'
import { parseISO } from 'date-fns'

export const getTimeEntries = async () => {
  const timeEntries = await prisma.timeEntry.findMany()
  return timeEntries
}

export const upsertTimeEntry = async (
  timeEntryId: string | undefined,
  _currentState: unknown,
  formData: FormData
) => {
  const projectId = formData.get('projectId') as string
  const startDateTime = formData.get('startDateTime') as string
  const endDateTime = formData.get('endDateTime') as string | null
  const description = formData.get('description') as string | null
  console.log('values', projectId, startDateTime, endDateTime)
  const { userId } = await getSessionOrFail()
  try {
    if (timeEntryId) {
      throw new Error('Not implemented')
    } else {
      await prisma.timeEntry.create({
        data: {
          projectId: projectId,
          startTime: parseISO(startDateTime),
          endTime: endDateTime ? parseISO(endDateTime) : null,
          description: description,
          userId: userId
        }
      })
    }
  } catch {
    return {
      error: 'unknown error occured'
    }
  }
}
