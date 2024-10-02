'use server'

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { getSessionOrFail } from '@/lib/sessions'
import { notFound, redirect } from 'next/navigation'
import { ProjectDetail, ProjectSummary } from '@/types'

type GetProjectsQuery = {
  keyword?: string
  includeArchived?: boolean
}
export const getProjects = async (
  query?: GetProjectsQuery
): Promise<ProjectSummary[]> => {
  const { keyword, includeArchived = false } = query ?? {}
  const { userId } = await getSessionOrFail()
  const where: Prisma.ProjectWhereInput = {
    projectMembers: {
      some: {
        userId: userId
      }
    }
  }
  if (keyword) {
    where.name = {
      contains: keyword
    }
  }
  if (!includeArchived) {
    where.isArchived = false
  }
  const projects = await prisma.project.findMany({
    where: where,
    orderBy: {
      id: 'desc'
    }
  })
  return projects
}
export const getProject = async (id: string): Promise<ProjectDetail> => {
  const { userId } = await getSessionOrFail()

  const project = await prisma.project.findFirst({
    where: {
      id: id,
      projectMembers: {
        some: {
          userId: userId
        }
      }
    }
  })
  if (project === null) {
    notFound()
  }
  return {
    id: project.id,
    name: project.name,
    description: project.description
  }
}

export const upsertProjectAction = async (
  projectId: string | undefined,
  _currentState: unknown,
  formData: FormData
) => {
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const { userId } = await getSessionOrFail()
  let id = ''

  try {
    if (projectId) {
      // Update project
      const result = await prisma.project.update({
        where: {
          id: projectId,
          projectMembers: {
            some: {
              userId: userId,
              role: 'ADMIN'
            }
          }
        },
        data: {
          name: name,
          description: description
        }
      })
      id = result.id
    } else {
      // Create project
      const result = await prisma.project.create({
        data: {
          name: name,
          description: description,
          projectMembers: {
            create: {
              userId: userId,
              role: 'ADMIN'
            }
          }
        }
      })
      id = result.id
    }
  } catch {
    return {
      error: 'unknown error'
    }
  }

  redirect(`/projects/${id}`)
}

export const deleteProject = async (projectId: string) => {
  const { userId } = await getSessionOrFail()
  await prisma.project.update({
    where: {
      id: projectId,
      projectMembers: {
        some: {
          userId: userId,
          role: 'ADMIN'
        }
      }
    },
    data: {
      isArchived: true
    }
  })
  redirect('/projects')
}
