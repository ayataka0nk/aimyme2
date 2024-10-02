import { getProjectOptions } from '@/app/options'
import { TimeEntryForm } from '../time-entry-form'

export default async function Page() {
  const projectOptions = await getProjectOptions()
  return (
    <TimeEntryForm
      projectId=""
      startDateTime={new Date()}
      endDateTime={undefined}
      projectOptions={projectOptions}
    />
  )
}
