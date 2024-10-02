import Link from 'next/link'

export default async function Page() {
  return (
    <div>
      <h1>Time Entries</h1>
      <Link href="/time-entries/new">New Time Entry</Link>
    </div>
  )
}
