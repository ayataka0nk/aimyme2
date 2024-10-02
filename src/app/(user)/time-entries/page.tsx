import Link from 'next/link'
import { getTimeEntries } from './actions'
import { Button } from '@/components/ui/button'

import { PlusIcon } from 'lucide-react'
import { TimeEntriesTable } from './TimeEntriesTable'
import { getProjectOptions } from '@/app/options'

export default async function TimeEntriesPage() {
  const timeEntries = await getTimeEntries()
  const projectOptions = await getProjectOptions()

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Time Entries</h1>
        <Link href="/time-entries/new" passHref>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" /> New Time Entry
          </Button>
        </Link>
      </div>
      <TimeEntriesTable
        timeEntries={timeEntries}
        projectOptions={projectOptions}
      />
    </div>
  )
}
