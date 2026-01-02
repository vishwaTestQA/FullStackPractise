import { useState } from 'react'
import SliderPreview from './SliderPreview'
import type { SliderFieldConfig } from './sliderTypes'
import SliderPropertPannel from './SliderPropertPannel'

const initialProps = {
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 30,
    marks:false
}

const SliderFormBuilder = () => {
    const [config, setConfig] = useState<SliderFieldConfig>(initialProps)
    const [value, setValue] = useState<number>(0)

    const handleChange = (val: number) => {
        setValue(val)
    }

    console.log(value)

  return (
    <div>
        <div style={{width:'200px'}}>
        <SliderPreview config={config} value={value} onChange={handleChange}/>
        </div>
        <SliderPropertPannel config={config} setConfig={setConfig}/>
    </div>
  )
  }


export default SliderFormBuilder