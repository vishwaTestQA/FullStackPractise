import React from 'react'
import type { NumberFieldConfig } from './Types'

type Props = {
    config: NumberFieldConfig
}

const NumberPreview: React.FC<Props> = ({config}) => {
  return (
    <div>
        <label htmlFor={config.label}>{config.label}</label>
        <input type='number' required={config.required} min={config.min} placeholder={config.placeholder}/>
    </div>
  )
}

export default NumberPreview