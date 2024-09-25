'use server'

import { authenticate } from '@/lib/auth'
import { SafeFormData } from '@/lib/SafeFormData'
import { SchemaValidationErrorBag } from '@/lib/SchemaValidationErrorBag'
import { setSession } from '@/lib/sessions'
import { FormErrors } from '@/lib/types'

import { redirect } from 'next/navigation'
import { z } from 'zod'

export type LoginFormValues = {
  email: string
  password: string
}

export type LoginFormState = {
  values: LoginFormValues
  errors: FormErrors<LoginFormValues> & { global: string }
}

const ClientZodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export const loginFormAction = async (
  _currentState: unknown,
  formData: FormData
) => {
  const data = new SafeFormData(formData)
  const email = data.getString('email')
  const password = data.getString('password')
  try {
    const validated = ClientZodSchema.parse({ email, password })
    const user = await authenticate(validated.email, validated.password)
    setSession({ userId: user.id })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const errors = new SchemaValidationErrorBag(error)
      return {
        values: {
          email: email,
          password: password
        },
        errors: {
          email: errors.getFirstError('email'),
          password: errors.getFirstError('password')
        }
      } as LoginFormState
    } else {
      return {
        values: {
          email: email,
          password: password
        },
        errors: {
          global: 'Invalid email or password'
        }
      } as LoginFormState
    }
  }
  redirect('/dashboard')
}
