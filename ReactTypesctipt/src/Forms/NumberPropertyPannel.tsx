import type { NumberFieldConfig } from "./Types"


type Props = {
    config: NumberFieldConfig
    setConfig: (config: NumberFieldConfig) => void
}

const NumberPropertyPannel = ({config, setConfig}: Props) => {
  //  const update = (name:keyof NumberFieldConfig, value: String | boolean) => {
  const update = <k extends keyof NumberFieldConfig>(name:k, value: NumberFieldConfig[k]) => {
     setConfig({
       ...config,
       [name]: value
     })
  }
  return (
    <div>
      <label htmlFor="label">Label</label>
      <input type='text' onChange={(e) => update("label", e.target.value)}/>

      <label htmlFor="min">Min</label>
      <input type='text' onChange={(e) => update("min", parseInt(e.target.value))}/>

           <label htmlFor="placeholder">Placeholder</label>
      <input type='text' onChange={(e) => update("placeholder", e.target.value)}/>

    </div>
  )
}

export default NumberPropertyPannel