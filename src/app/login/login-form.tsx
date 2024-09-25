'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import PasswordToggleButton from './password-toggle-button'
import { useFormState } from 'react-dom'
import { loginFormAction } from './actions'
import { AlertCircle } from 'lucide-react'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [state, dispatch] = useFormState(loginFormAction, {
    values: {
      email: '',
      password: ''
    },
    errors: {
      email: '',
      password: '',
      global: ''
    }
  })

  return (
    <div className="w-full max-w-md">
      {state.errors.global && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.errors.global}</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
          <CardDescription>アカウントにログインしてください</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  defaultValue={state.values.email}
                  required
                />
                {state.errors.email && (
                  <p className="text-sm text-destructive">
                    {state.errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    defaultValue={state.values.password}
                    required
                  />
                  <PasswordToggleButton
                    showPassword={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                  />
                </div>
                {state.errors.password && (
                  <p className="text-sm text-destructive">
                    {state.errors.password}
                  </p>
                )}
              </div>
            </div>
            <Button className="w-full mt-4" type="submit">
              ログイン
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center">
            <a href="#" className="text-blue-600 hover:underline">
              パスワードをお忘れですか？
            </a>
          </div>
          <div className="text-sm text-center">
            アカウントをお持ちでない方は{' '}
            <a href="#" className="text-blue-600 hover:underline">
              新規登録
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
