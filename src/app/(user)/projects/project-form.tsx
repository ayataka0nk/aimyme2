'use client'
import { useFormState } from 'react-dom'
import { upsertProjectAction } from './actions'
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
import { AlertCircle } from 'lucide-react'

type Props = {
  id?: string
  name: string
  description: string
}

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1)
})

export const ProjectForm = ({ id, name, description }: Props) => {
  const [state, dispatch] = useFormState(
    upsertProjectAction.bind(null, id),
    undefined
  )
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      description
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      console.log(key, value)
      formData.append(key, value)
    })
    dispatch(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {id ? 'プロジェクトを編集' : 'プロジェクトを作成'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            {id && <input type="hidden" name="id" value={id} />}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <Input placeholder="description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {state?.error && (
              <div className="mt-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{state?.error}</AlertDescription>
                </Alert>
              </div>
            )}
            <div className="flex justify-end">
              <Button type="submit">保存する</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
