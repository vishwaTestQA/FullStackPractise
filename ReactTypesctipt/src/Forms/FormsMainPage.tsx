import ToggleButton from './TimeComp/ToggleButton'
import NumberFormBuilder from './NumberFormBuilder'
import TimeFormBuilder from './TimeComp/TimeFormBuilder'
import DateFormBuilder from './Components/DateComp/DateFormBuilder'
import SliderFormBuilder from './SliderComp/SliderFormBuilder'
import { Slider } from '@mui/material'
import { useState } from 'react'
import VolumeSliderConfig from './SliderComp/VolumeSliderConfig'

const FormsMainPage = () => {
    const [value, setValue] = useState<number>(0)
  return (
    <div>
        <ToggleButton/>
         <NumberFormBuilder/>
         {/* <TimeFormBuilder/> */}
         {/* <DateFormBuilder/> */}
         {/* <SliderFormBuilder/> */}
         {/* <Slider defaultValue={30} value={value} onChange={(e) => {
            // const value = e.target.value
            if(value){
              setValue(Number(value))
            }
         }}/> */}

         <VolumeSliderConfig/>
    </div>
  )
}

export default FormsMainPage