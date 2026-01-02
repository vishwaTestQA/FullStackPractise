import InputComponent from '../Components/UI/TextComponent'
import type { TimeFieldConfig } from './Types'

type Props = {
    config: TimeFieldConfig,
    setConfig: (config: TimeFieldConfig) => void
}

const TimePropertyPannel = ({config, setConfig}: Props) => {
    const update = <k extends keyof TimeFieldConfig>(name:k, value:TimeFieldConfig[k]) =>{
       setConfig({
        ...config,
        [name] : value
       })
    }
  return (
    <div>
        <InputComponent label="label" value={config.label} onChange={(e) => update("label", e)}/>
        <InputComponent label="min" value={config.min} onChange={(e) => update("min", e)}/>
        <InputComponent label="max" value={config.max} onChange={(e) => update("max", e)}/>
    </div>
  )
}

export default TimePropertyPannel