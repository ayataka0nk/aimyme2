import SideNavigation from '@/components/side-navigation/SideNavigation'
import { getCurrentUserOrFail } from '@/lib/auth'

export default async function UserLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUserOrFail()
  return (
    <>
      <SideNavigation email={user.email} name={user.name} />
      <main className="pl-64">{children}</main>
    </>
  )
}
