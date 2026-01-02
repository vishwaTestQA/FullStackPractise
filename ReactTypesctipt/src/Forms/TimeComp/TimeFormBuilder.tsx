import { useState } from 'react'
import TimePreview from './TimePreview'
import TimePropertyPannel from './TimePropertyPannel'
import type { TimeFieldConfig } from './Types'

const initialConfig: TimeFieldConfig = {
   label: 'Time',
   min: '',
   max: '',
   required: true,
   disabled: false
}

const TimeFormBuilder =() => {
    const [config, setConfig] = useState<TimeFieldConfig>(initialConfig)
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string | undefined>(undefined)

    const validate = (value: string) => {
        if(config.required && !value){
            return "This field is required"
        }
        if(config.min && value < config.min) return `Time must be after ${config.min}`
        if(config.max && value > config.max) return `Time must be before ${config.max}`
        return undefined
    }

    const handleChange = (value: string) => {
        setValue(value)
        setError(validate(value))
    }



  return (
    <div>
        <TimePreview config={config} error={error} value={value} onChange={handleChange}/>                                  
        <TimePropertyPannel config={config} setConfig={setConfig}/>
    </div>
  )
}

export default TimeFormBuilder