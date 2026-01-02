import { useState } from 'react'
import DatePreview from './DatePreview'
import DatePropertyPannel from './DatePropertyPannel'
import type { DateFieldConfig } from './Types'

const InitialConfig = {
    label: 'Date',
    min: '',
    max: '',
    required: true,
    disabled: false,
}

const DateFormBuilder = () => {
    const [config, setConfig] = useState<DateFieldConfig>(InitialConfig)
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string | undefined>('')

    //validation
    const validate = (value: string) => {
        if(config.required && !value){
            return 'This field is required'
        }
        if(config.min && value < config.min){
            return `The date should be greater than ${config.min}`
        }
         if(config.max && value > config.max){
            return `The date should be lesser than ${config.max}`
        }
        return undefined
    }

    const handleChange = (value: string) => {
        setValue(value)
        setError(validate(value))
    }
    

  return (
    <div>
        <DatePreview config={config} error={error} value={value} onChange={handleChange}/>
        <DatePropertyPannel config={config} setConfig={setConfig}/>
    </div>
  )
}

export default DateFormBuilder