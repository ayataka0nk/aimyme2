import { ComponentProps, memo } from 'react'
import { Menu, X } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet'
import SideNavigation from './SideNavigation'

type Props = ComponentProps<'header'> & {
  email: string
  name: string
}

const TopAppBarComponent = ({ className, email, name, ...props }: Props) => {
  return (
    <Sheet>
      <header className={`flex h-12 items-center ${className}`} {...props}>
        <SheetTrigger>
          <div className="h-9 w-9 hover:bg-accent flex items-center justify-center rounded-md">
            <Menu className="h-5 w-5" />
          </div>
        </SheetTrigger>
        <p>AImyMe2</p>
      </header>
      <SheetContent side="left" className="w-64">
        <SheetTitle>SideNavigation</SheetTitle>
        <SheetDescription>SideNavigation</SheetDescription>
        <SideNavigation
          email={email}
          name={name}
          closeButton={
            <SheetTrigger>
              <div className="h-9 w-9 hover:bg-accent flex items-center justify-center rounded-md">
                <X className="h-5 w-5" />
              </div>
            </SheetTrigger>
          }
        />
      </SheetContent>
    </Sheet>
  )
}

export const TopAppBar = memo(TopAppBarComponent) as typeof TopAppBarComponent
