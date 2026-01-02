import React from 'react'

// BaseInput only contains props related to shared UI concerns like label, error, and disabled state.
//  All native input behavior is inherited via InputHTMLAttributes. This keeps the component aligned with 
//  Single Responsibility Principle and makes specialized inputs like TimeInput or TextInput easy to build on top.”

// low level input logic


/**
 * BaseInput is a PRESENTATIONAL component
 * - Knows nothing about value types
 * - Forwards all native input props
 */

// BaseInput responsibilities
// Render <input>
// Forward native attributes (value, disabled, required, etc.)
// Show label & error

type BaseProps = {
    label?: string,
    error?: string,
    // disabled?: string,
}

const BaseInput: React.FC<BaseProps & React.HTMLAttributes<HTMLInputElement>> = ({label, error, ...props}) => {
  return (
    <div>
        {label && <label>{label}</label>}
        <input {...props}/>
        {error && <span>{error}</span>}
    </div>
  )
}

export default BaseInput