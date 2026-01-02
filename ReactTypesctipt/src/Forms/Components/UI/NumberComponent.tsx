import React from 'react'
import BaseInput from './BaseInput'

type Props = {
    label?: string,
    error?: string,
    onChange?: (v:number) => void
// } & React.InputHTMLAttributes<HTMLInputElement>
 } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>

const NumberComponent = ({label, error, onChange, ...props}: Props) => {
  return (
    <div>
        <BaseInput  label={label} 
                    error={error} 
                    type='number' 
                    // onChange={e => onChange?.(e.target.value)}   
                    onChange={(e) => {
                        const value = e.currentTarget.value
                        onChange?.(value === '' ? NaN : Number(value))
                    }}
                    {...props}/>
    </div>
  )
}

export default NumberComponent