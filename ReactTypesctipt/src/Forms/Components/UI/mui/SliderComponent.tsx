import { Slider, Typography } from '@mui/material'
// import type {SliderProps as MuiSliderProps} from '@mui/material/slider'

type Props = {
    label?: string,
    value?: number,
    error?: string,
    min?: number,
    max?: number,
    step?: number,
    onChange?: (value: number) => void,
    marks: boolean
    // size: string
}
// } & Pick<React.InputHTMLAttributes<HTMLInputElement>, 'min' | 'value'|'max' | 'step'>
// } & Pick<MuiSliderProps, 'min' | 'max' | 'step' | 'disabled'>

//sliderProps are huge hence we pick only necessary props from it and through this we can control 

const SliderComponent = ({label, onChange, value, error, marks, ...props}: Props) => {
  return (
    <div>
        {label && <Typography>{label}</Typography>}
        <Slider 
             value={value}
             onChange={(_, sliderValue) => onChange?.(sliderValue as number)}
             {...props}
             marks={marks}
        />
        {error && <Typography>{error}</Typography>}
    </div>
  )
}

export default SliderComponent