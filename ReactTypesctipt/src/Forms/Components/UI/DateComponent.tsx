import React from 'react'
import BaseInput from './BaseInput'

type Props = {
    label?: string
    error?: string,
    min?: string,             //
    max?: string,
    required?: boolean,
    // disabled: boolean     //if this is not commented then omit wont have effect
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled'>

const DateComponent = ({label, error, ...props}: Props) => {
  return (
    <div>
       <BaseInput type='date' label={label} error={error} {...props}/>
    </div>
  )
}

export default DateComponent