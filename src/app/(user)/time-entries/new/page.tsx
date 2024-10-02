import { getProjectOptions } from '@/app/options'
import { TimeEntryForm } from '../time-entry-form'

export default async function Page() {
  const projectOptions = await getProjectOptions()
  return (
    <div>
      <TimeEntryForm
        id=""
        projectId=""
        year=""
        month=""
        startDate=""
        startTime=""
        endDate=""
        endTime=""
        projectOptions={projectOptions}
      />
    </div>
  )
}
