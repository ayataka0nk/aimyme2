import { getCurrentUserOrFail } from '@/lib/auth'

export default async function DashBoardPage() {
  const user = await getCurrentUserOrFail()

  return <div>{JSON.stringify(user)}</div>
}
