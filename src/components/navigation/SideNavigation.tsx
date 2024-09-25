import {
  Home,
  BarChart,
  Users,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import React from 'react'

const navItems = [
  { icon: Home, label: 'ホーム', href: '/dashboard' },
  { icon: BarChart, label: '分析', href: '/analytics' },
  { icon: Users, label: 'ユーザー', href: '/users' },
  { icon: Settings, label: '設定', href: '/settings' },
  { icon: HelpCircle, label: 'ヘルプ', href: '/help' }
]

type Props = {
  email: string
  name: string
  closeButton?: React.ReactNode
  className?: string
}
export default function SideNavigation({
  email,
  name,
  closeButton,
  className
}: Props) {
  return (
    <div
      className={`fixed left-0 top-0 z-10 flex flex-col h-screen w-64 border-r bg-background ${className}`}
    >
      <div className="flex h-12 items-center border-b pl-6 pr-2 justify-between">
        <span className="text-lg font-semibold">AImyMe2</span>
        {closeButton}
      </div>

      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-4 min-h-[calc(100vh-48px-128px)]">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              asChild
              className="justify-start"
            >
              <Link href={item.href} className="flex items-center gap-3">
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
        <div className="border-t p-4 h-32">
          <div className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/logout" className="flex items-center gap-3">
              <LogOut className="h-5 w-5" />
              <span>ログアウト</span>
            </Link>
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}
