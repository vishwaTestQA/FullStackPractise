import React from 'react'
import BaseInput from './BaseInput'

type Props = {
    min?:string,
    max?:string,
    // required?:boolean,
    disabled?:boolean,
    label?: string,
    error: string | undefined,
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled'>

// const TimeComponent: React.FC<Props & React.InputHTMLAttributes<HTMLInputElement>> = ({type, label, error, ...props}) => {
const TimeComponent = ({label, error, ...props}: Props) => {
  return (
    <div>
        <BaseInput type='time' label={label} error={error} {...props}/>
    </div>
  )
}

export default TimeComponent