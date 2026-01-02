import type { DateFieldConfig } from './Types'
import TextComponent from '../UI/TextComponent'

type Props = {
    config: DateFieldConfig,
    // setConfig: (c: DateFieldConfig) => void
    setConfig: React.Dispatch<React.SetStateAction<DateFieldConfig>>
}

//const obj={
//   k1: v1,
//   k2: v2,
//   k3: v3
// }

//<k extends keyof obj>(name: string, value: obj[k])

const DatePropertyPannel = ({config, setConfig}: Props) => {
    const update = <k extends keyof DateFieldConfig>(name:string, value:DateFieldConfig[k]) => {
      setConfig({
        ...config,
        [name]: value
      })
    }
  return (
    <div>
        <TextComponent label="label" onChange={(e) => update("label", e)}/>
        
    </div>
  )
}

export default DatePropertyPannel