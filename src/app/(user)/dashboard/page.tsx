import { getCurrentUserOrFail } from '@/lib/auth'

export default async function DashBoardPage() {
  const user = await getCurrentUserOrFail()

  return <div className="h-[1000px]">{JSON.stringify(user)}</div>
}
