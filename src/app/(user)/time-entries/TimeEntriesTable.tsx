import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ComboboxOption, TimeEntrySummary } from '@/types'
import Link from 'next/link'

type Props = {
  timeEntries: TimeEntrySummary[]
  projectOptions: ComboboxOption[]
}
export const TimeEntriesTable = ({ timeEntries, projectOptions }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>End Time</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {timeEntries.map((timeEntry) => (
          <TableRow key={timeEntry.id}>
            <TableCell>{timeEntry.projectName}</TableCell>
            <TableCell>{timeEntry.startTime?.toLocaleString()}</TableCell>
            <TableCell>{timeEntry.endTime?.toLocaleString()}</TableCell>
            <TableCell>{timeEntry.description}</TableCell>
            <TableCell>
              <Link href={`/time-entries/${timeEntry.id}/edit`}>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
