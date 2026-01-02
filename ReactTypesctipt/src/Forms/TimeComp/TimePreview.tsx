import type {  TimeFieldConfig } from './Types'
import TimeComponent from '../Components/UI/TimeComponent'

type Props = {
  config: TimeFieldConfig,
  error: string | undefined
  value: string
  onChange: (v: string) => void
}

const TimePreview = ({config, error, value, onChange}: Props) => {
  return (
    <div>
    <TimeComponent  
            label={config.label} 
            min={config.min} 
            max={config.max} 
            required={config.required}
            disabled={config.disabled}
            error={error}
            value = {value}
            onChange={e => onChange(e.target.value)}
            />
    </div>
  )
}

export default TimePreview