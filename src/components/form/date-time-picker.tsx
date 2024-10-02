import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'

type Props = {
  label: string
  value: Date | undefined
  onChange: (date: Date | undefined) => void
}
export const RhfDateTimePicker = ({ label, value, onChange }: Props) => {
  return (
    <FormItem className="flex flex-col">
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-full pl-3 text-left font-normal',
                !value && 'text-muted-foreground'
              )}
            >
              {value ? (
                format(value, 'yyyy/MM/dd HH:mm')
              ) : (
                <span>{label}を選択</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            initialFocus
          />
          <div className="p-3 border-t">
            <Input
              type="time"
              value={format(value || new Date(), 'HH:mm')}
              onChange={(e) => {
                const [hours, minutes] = e.target.value.split(':')
                const newDate = new Date(value || new Date())
                newDate.setHours(parseInt(hours), parseInt(minutes))
                onChange(newDate)
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )
}
