import DateComponent from '../UI/DateComponent'
import type { DateFieldConfig } from './Types'

type Props = {
    config: DateFieldConfig,
    error?: string | undefined,
    value: string,
    onChange: (value: string) => void
}

const DatePreview = ({config, error, value, onChange}: Props) => {
  return (
    <div>
        <DateComponent 
             label={config.label} 
            //  disabled={config.disabled}  it cant be passed becz we disabled it
             error={error} 
             value={value} 
             onChange={e => onChange(e.target.value)}/>
    </div>
  )
}

export default DatePreview