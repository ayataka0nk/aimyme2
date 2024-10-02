'use client'

import { useFormState } from 'react-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, SaveIcon } from 'lucide-react'
import { upsertTimeEntry } from './actions'
import { ComboboxOption } from '@/types'
import { useRef } from 'react'
import { RhfDateTimePicker } from '@/components/form/date-time-picker'
import { RhfCombobox } from '@/components/form/combobox'

type Props = {
  id?: string
  projectId: string
  year: string
  month: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  projectOptions: ComboboxOption[]
}

const formSchema = z.object({
  projectId: z.string().min(1, 'プロジェクトを選択してください'),
  startDateTime: z.date(),
  endDateTime: z.date().optional()
})

export const TimeEntryForm = ({
  id,
  projectId,
  year,
  month,
  startDate,
  startTime,
  endDate,
  endTime,
  projectOptions
}: Props) => {
  const [state, dispatch] = useFormState(
    upsertTimeEntry.bind(null, id),
    undefined
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectId,
      startDateTime: new Date(),
      endDateTime: undefined
    }
  })

  const formRef = useRef<HTMLFormElement>(null)

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    if (formRef.current) {
      dispatch(new FormData(formRef.current))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? '稼働時間を編集' : '稼働時間を記録'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            ref={formRef}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <RhfCombobox
                  label="プロジェクト"
                  value={field.value}
                  onChange={field.onChange}
                  options={projectOptions}
                />
              )}
            />

            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <RhfDateTimePicker
                  label="開始日時"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <RhfDateTimePicker
                  label="終了日時"
                  value={field.value}
                  onChange={field.onChange}
                />
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
