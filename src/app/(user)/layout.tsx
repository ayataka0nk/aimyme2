import SideNavigation from '@/components/navigation/SideNavigation'
import { TopAppBar } from '@/components/navigation/TopAppBar'
import { getCurrentUserOrFail } from '@/lib/auth'

export default async function UserLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUserOrFail()
  return (
    <>
      <SideNavigation
        email={user.email}
        name={user.name}
        className="hidden md:block"
      />
      <div className="md:pl-64">
        <TopAppBar email={user.email} name={user.name} className="md:hidden" />
        <main>{children}</main>
      </div>
    </>
  )
}
