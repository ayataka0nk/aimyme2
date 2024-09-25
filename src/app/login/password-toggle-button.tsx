'use client'

import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

interface PasswordToggleButtonProps {
  showPassword: boolean
  onToggle: () => void
}

export default function PasswordToggleButton({
  showPassword,
  onToggle
}: PasswordToggleButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="absolute right-2 top-1/2 transform -translate-y-1/2"
      onClick={onToggle}
    >
      {showPassword ? (
        <EyeOffIcon className="h-4 w-4" />
      ) : (
        <EyeIcon className="h-4 w-4" />
      )}
      <span className="sr-only">
        {showPassword ? 'パスワードを隠す' : 'パスワードを表示'}
      </span>
    </Button>
  )
}
