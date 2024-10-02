import Link from 'next/link'
import { getTimeEntries } from './actions'

export default async function Page() {
  const timeEntries = await getTimeEntries()
  return (
    <div>
      <h1>Time Entries</h1>
      <Link href="/time-entries/new">New Time Entry</Link>
      <ul>
        {timeEntries.map((timeEntry) => (
          <li key={timeEntry.id}>
            <Link href={`/time-entries/${timeEntry.id}`}>
              <div>{timeEntry.id}</div>
              <div>{timeEntry.startTime?.toISOString()}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
