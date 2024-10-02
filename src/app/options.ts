'use server'

import { ComboboxOption } from '@/types'
import { getProjects } from './(user)/projects/actions'

export const getProjectOptions = async (): Promise<ComboboxOption[]> => {
  const projects = await getProjects()
  return projects.map((project) => ({
    value: project.id,
    label: project.name
  }))
}
