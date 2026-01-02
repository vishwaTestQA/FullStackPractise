import React from 'react'
import type { BaseInputPropsMui } from './BaseInputProps'
import { TextField } from '@mui/material'

const TextInput = ({
     label,
     value,
     error,
     onChange,
     ...props
    }:BaseInputPropsMui<string>) => {
  return (
    <div>
        <TextField
           label={label}
           value={value}
        />
    </div>
  )
}

export default TextInput