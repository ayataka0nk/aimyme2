import { ComboboxOption } from '@/types'
import { Combobox } from '../ui/combobox'
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form'

type Props = {
  label: string
  value: string | undefined
  onChange: (value: string | undefined) => void
  options: ComboboxOption[]
}

export const RhfCombobox = ({ label, value, onChange, options }: Props) => {
  return (
    <FormItem className="flex flex-col">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Combobox value={value} onChange={onChange} options={options} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
