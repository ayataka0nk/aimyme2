'use server'

import { prisma } from '@/lib/prisma'
import { getSessionOrFail } from '@/lib/sessions'
import { TimeEntrySummary } from '@/types'
import { parseISO } from 'date-fns'
import { redirect } from 'next/navigation'

export const getTimeEntries = async (): Promise<TimeEntrySummary[]> => {
  const { userId } = await getSessionOrFail()
  const timeEntries = await prisma.timeEntry.findMany({
    where: {
      userId: userId
    },
    include: {
      project: true
    },
    orderBy: {
      startTime: 'desc'
    }
  })
  return timeEntries.map((timeEntry) => ({
    id: timeEntry.id,
    startTime: timeEntry.startTime ?? undefined,
    endTime: timeEntry.endTime ?? undefined,
    description: timeEntry.description ?? undefined,
    projectId: timeEntry.projectId,
    projectName: timeEntry.project.name
  }))
}

export const getTimeEntry = async (
  timeEntryId: string
): Promise<TimeEntrySummary> => {
  const timeEntry = await prisma.timeEntry.findUnique({
    where: {
      id: timeEntryId
    },
    include: {
      project: true
    }
  })
  if (!timeEntry) {
    throw new Error('Time entry not found')
  }
  return {
    id: timeEntry.id,
    startTime: timeEntry.startTime ?? undefined,
    endTime: timeEntry.endTime ?? undefined,
    description: timeEntry.description ?? undefined,
    projectId: timeEntry.projectId,
    projectName: timeEntry.project.name
  }
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
      await prisma.timeEntry.update({
        where: {
          id: timeEntryId
        },
        data: {
          projectId: projectId,
          startTime: parseISO(startDateTime),
          endTime: endDateTime ? parseISO(endDateTime) : null,
          description: description
        }
      })
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
  redirect('/time-entries')
}
