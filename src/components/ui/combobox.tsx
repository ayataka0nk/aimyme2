'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ComboboxOption } from '@/types'

export function Combobox({
  name,
  options,
  value,
  onChange,
  defaultValue
}: {
  name?: string
  options: ComboboxOption[]
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
}) {
  const [open, setOpen] = React.useState(false)
  const isControlled = typeof value !== 'undefined'
  console.log('isControlled', isControlled)
  console.log('value', value)

  const [localValue, setLocalValue] = React.useState(
    isControlled ? value : defaultValue ?? ''
  )
  console.log('localValue', localValue)

  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [buttonWidth, setButtonWidth] = React.useState<number | undefined>(
    undefined
  )

  React.useEffect(() => {
    if (isControlled) {
      // コントロールされている場合は、外部からの変更を反映
      setLocalValue(value)
    }
  }, [value, isControlled])

  React.useEffect(() => {
    // 内部の変更時にonChangeを呼ぶ
    onChange?.(localValue)
  }, [localValue, onChange])

  React.useEffect(() => {
    if (buttonRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target === buttonRef.current) {
            setButtonWidth(entry.contentRect.width)
          }
        }
      })

      resizeObserver.observe(buttonRef.current)

      return () => {
        resizeObserver.disconnect()
      }
    }
  }, [])

  return (
    <>
      <input type="hidden" name={name} value={localValue} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={buttonRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {localValue
              ? options.find((option) => option.value === localValue)?.label
              : 'Select ...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" style={{ width: buttonWidth }}>
          <Command
            filter={(value, search, keywords) => {
              // ラベルも検索対象にするため
              const extendValue = value + ' ' + keywords?.join(' ')
              if (extendValue.includes(search)) return 1
              return 0
            }}
          >
            <CommandInput placeholder="Search ..." />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    // ラベルも検索対象にしたいので、キーワードに追加
                    keywords={[option.label]}
                    onSelect={(currentValue) => {
                      setLocalValue(
                        currentValue === localValue ? '' : currentValue
                      )
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        localValue === option.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
