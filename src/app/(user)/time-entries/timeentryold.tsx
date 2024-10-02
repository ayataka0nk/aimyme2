'use client'

import { useFormState } from 'react-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, SaveIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { upsertTimeEntry } from './actions'

type Props = {
  id?: string
  projectId: string
  year: string
  month: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
}

const formSchema = z.object({
  projectId: z.string().min(1, 'プロジェクトを選択してください'),
  startDateTime: z.date(),
  endDateTime: z.date()
})

export const TimeEntryForm = ({
  id,
  projectId,
  year,
  month,
  startDate,
  startTime,
  endDate,
  endTime
}: Props) => {
  const [state, dispatch] = useFormState(
    upsertTimeEntry.bind(null, id),
    undefined
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectId,
      startDateTime: new Date(`${year}-${month}-${startDate}T${startTime}`),
      endDateTime: new Date(`${year}-${month}-${endDate}T${endTime}`)
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof Date) {
        formData.append(key, value.toISOString())
      } else {
        formData.append(key, value)
      }
    })
    dispatch(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? '稼働時間を編集' : '稼働時間を記録'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>プロジェクト</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="プロジェクトを選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="project1">プロジェクト1</SelectItem>
                      <SelectItem value="project2">プロジェクト2</SelectItem>
                      <SelectItem value="project3">プロジェクト3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>開始日時</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'yyyy/MM/dd HH:mm')
                          ) : (
                            <span>開始日時を選択</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                      <div className="p-3 border-t">
                        <Input
                          type="time"
                          value={format(field.value || new Date(), 'HH:mm')}
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(':')
                            const newDate = new Date(field.value || new Date())
                            newDate.setHours(parseInt(hours), parseInt(minutes))
                            field.onChange(newDate)
                          }}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>終了日時</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'yyyy/MM/dd HH:mm')
                          ) : (
                            <span>終了日時を選択</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                      <div className="p-3 border-t">
                        <Input
                          type="time"
                          value={format(field.value || new Date(), 'HH:mm')}
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(':')
                            const newDate = new Date(field.value || new Date())
                            newDate.setHours(parseInt(hours), parseInt(minutes))
                            field.onChange(newDate)
                          }}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {state?.error && (
              <div className="mt-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>エラー</AlertTitle>
                  <AlertDescription>{state?.error}</AlertDescription>
                </Alert>
              </div>
            )}
            <div className="flex justify-end">
              <Button type="submit">
                <SaveIcon className="mr-2 w-4 h-4" /> 保存
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
