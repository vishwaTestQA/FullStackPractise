import NumberComponent from '../Components/UI/NumberComponent'
import TextComponent from '../Components/UI/TextComponent'
import type { SliderFieldConfig } from './sliderTypes'

type Props = {
   config: SliderFieldConfig,
   setConfig: (c: SliderFieldConfig) => void
}

const SliderPropertPannel = ({config, setConfig}: Props) => {

    const update = <k extends keyof SliderFieldConfig>(name:string, value:SliderFieldConfig[k]) => {
       setConfig({
        ...config,
        [name]: value
       })
    }

  return (
    <div>
        <TextComponent label="label"  onChange={(e) => update('label', e)}/>
        {/* <TextComponent label='step' onChange={(e) => update('step', e)}/>    
        <TextComponent label='min' onChange={(e) => update('min', e)}/>    
        <TextComponent label='max' onChange={(e) => update('max', e)}/>     */}
        <NumberComponent label='min' onChange={(e) => update('max', e)}/>
    </div>
  )
}

export default SliderPropertPannel