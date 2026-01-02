import { VolumeDown, VolumeUp } from '@mui/icons-material'
import SliderComponent from '../Components/UI/mui/SliderComponent'
import type { SliderFieldConfig } from './sliderTypes'
import { IconButton } from '@mui/material'

type Props = {
    config: SliderFieldConfig,
    value: number,                //when we type it 
    onChange: (v: number) => void   //its to handle the change event to save in backend
    classname: string,
    marks:boolean,
    volumeChange: (v: number) => void
}

const VolumeSlider = ({config, value, onChange, volumeChange, classname, marks}: Props) => {
  return (
    <div>
        {/* <IconButton onClick={(_,value) => volumeChange?.(value === '' ? NaN: value as Number)}>
        <VolumeDown />
         </IconButton>    */}
        <div className={classname}>
        <SliderComponent 
             label={config.label} 
             marks={marks}
             min={config.min} 
             max={config.max} 
             step={config.step} 
             value={value}
             onChange={onChange}
         
            //  size={size}
            />
            </div>
            {/* <VolumeUp onChange={volumeUp}/> */}
    </div>
  )
}

export default VolumeSlider