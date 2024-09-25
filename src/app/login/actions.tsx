'use server'

import { authenticate } from '@/lib/auth'
import { setSession } from '@/lib/sessions'

import { redirect } from 'next/navigation'

export const loginFormAction = async (
  _currentState: unknown,
  formData: FormData
) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  try {
    const user = await authenticate(email, password)
    setSession({ userId: user.id })
  } catch (error: unknown) {
    return {
      error: 'Invalid email or password'
    }
  }
  redirect('/dashboard')
}
