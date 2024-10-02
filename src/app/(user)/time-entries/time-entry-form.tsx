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
  FormLabel
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, SaveIcon } from 'lucide-react'
import { upsertTimeEntry } from './actions'
import { ComboboxOption } from '@/types'
import { RhfDateTimePicker } from '@/components/form/date-time-picker'
import { RhfCombobox } from '@/components/form/combobox'
import { toUtcIsoString } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  projectId: z.string().min(1, 'プロジェクトを選択してください'),
  startDateTime: z.date(),
  endDateTime: z.date().optional(),
  description: z.string().optional()
})

type Props = {
  id?: string
  projectId: string
  startDateTime: Date
  endDateTime?: Date
  projectOptions: ComboboxOption[]
}

export const TimeEntryForm = ({
  id,
  projectId,
  startDateTime,
  endDateTime,
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
      startDateTime: startDateTime,
      endDateTime: endDateTime
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    formData.append('projectId', values.projectId)
    formData.append('startDateTime', toUtcIsoString(values.startDateTime))
    const endDateTime = toUtcIsoString(values.endDateTime)
    if (endDateTime) {
      formData.append('endDateTime', endDateTime)
    }
    if (values.description) {
      formData.append('description', values.description)
    }
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>説明</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="稼働内容を記入してください"
                      rows={3}
                    />
                  </FormControl>
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
