import SliderComponent from '../Components/UI/mui/SliderComponent'
import type { SliderFieldConfig } from './sliderTypes'

type Props = {
    config: SliderFieldConfig,
    value: number,                //when we type it 
    onChange: (v: number) => void   //its to handle the change event to save in backend
}

const SliderPreview = ({config, value, onChange}: Props) => {
  return (
    <div>
        <SliderComponent 
             label={config.label} 
             min={config.min} 
             max={config.max} 
             step={config.step} 
             value={value}
             onChange={onChange}
             marks={config.marks}
            />
    </div>
  )
}

export default SliderPreview