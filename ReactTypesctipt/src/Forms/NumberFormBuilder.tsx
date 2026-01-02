import { useState } from 'react'
import NumberPreview from './NumberPreview'
import type { NumberFieldConfig } from './Types'
import NumberPropertyPannel from './NumberPropertyPannel'

const initialConfig: NumberFieldConfig = {
  id: 'number-1',
  label: 'number',
  placeholder: 'Enter number',
  min: 0,
  max: 100,
  step: 1,
  required: false,
  disabled: false,
}

const NumberFormBuilder = () => {
    const [config, setConfig] = useState<NumberFieldConfig>(initialConfig)
  return (
    <div>
        <NumberPreview config={config}/>
        <NumberPropertyPannel config={config} setConfig={setConfig}/>
    </div>
  )
}

export default NumberFormBuilder