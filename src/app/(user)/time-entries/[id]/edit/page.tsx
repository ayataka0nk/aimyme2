import { getProjectOptions } from '@/app/options'
import { getTimeEntry } from '../../actions'
import { TimeEntryForm } from '../../time-entry-form'

export default async function Page({ params }: { params: { id: string } }) {
  const timeEntry = await getTimeEntry(params.id)
  const projectOptions = await getProjectOptions()
  console.log(timeEntry)
  return (
    <TimeEntryForm
      id={timeEntry.id}
      projectId={timeEntry.projectId}
      startDateTime={timeEntry.startTime}
      endDateTime={timeEntry.endTime}
      description={timeEntry.description}
      projectOptions={projectOptions}
    />
  )
}
