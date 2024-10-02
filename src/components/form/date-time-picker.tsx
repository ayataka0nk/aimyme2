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
import { format, setHours, setMinutes, setSeconds } from 'date-fns'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'

type Props = {
  label: string
  value: Date | undefined
  onChange: (date: Date | undefined) => void
}

export const RhfDateTimePicker = ({ label, value, onChange }: Props) => {
  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate && value) {
      // 新しい日付を設定しつつ、既存の時間と分を保持
      const updatedDate = setHours(
        setMinutes(newDate, value.getMinutes()),
        value.getHours()
      )
      onChange(setSeconds(updatedDate, 0)) // 秒は00に設定
    } else if (newDate) {
      // 初めて日付が設定される場合
      onChange(setSeconds(newDate, 0))
    } else {
      onChange(undefined)
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':')
    if (value) {
      const newDate = new Date(value)
      newDate.setHours(parseInt(hours), parseInt(minutes), 0) // 秒は0に設定
      onChange(newDate)
    } else {
      // 時間が先に設定される場合、現在の日付を使用
      const newDate = new Date()
      newDate.setHours(parseInt(hours), parseInt(minutes), 0)
      onChange(newDate)
    }
  }

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
            onSelect={handleDateChange}
            initialFocus
          />
          <div className="p-3 border-t">
            <Input
              type="time"
              value={value ? format(value, 'HH:mm') : ''}
              onChange={handleTimeChange}
            />
          </div>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )
}
