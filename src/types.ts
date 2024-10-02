export type User = {
  id: string
  email: string
  name: string
}

export type ProjectSummary = {
  id: string
  name: string
  description: string
}

export type ProjectDetail = {
  id: string
  name: string
  description: string
}

export type ComboboxOption = {
  value: string
  label: string
}

export type TimeEntrySummary = {
  id: string
  startTime?: Date
  endTime?: Date
  description?: string
  projectId: string
  projectName: string
}
