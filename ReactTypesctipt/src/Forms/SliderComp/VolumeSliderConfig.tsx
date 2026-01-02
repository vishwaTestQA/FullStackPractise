import React, { useState } from 'react'
import VolumeSlider from './VolumeSlider'
import type { SliderFieldConfig } from './sliderTypes'

const initialConfig = {            //here no need to use ? for props becz its initialConfig 
    min: 0,
    max: 100,
    step: 10,
    label: 'volume',
    defaultValue: 10,
    marks: true,
}

const VolumeSliderConfig = () => {
    const [config, setConfig] = useState<SliderFieldConfig>(initialConfig)
    const [value, setValue] = useState<number>(initialConfig?.defaultValue)
    const [volume, setVolume] = useState<number>(initialConfig?.defaultValue)


    const handleChange=(val: number)=>{
        setValue(val)
    }

    console.log(value)

  return (
    <div>
        <VolumeSlider config={config} value={value} onChange={handleChange} volumeChange= {setVolume} classname={'volume'} marks={config.marks}/>
    </div>
  )
}

export default VolumeSliderConfig