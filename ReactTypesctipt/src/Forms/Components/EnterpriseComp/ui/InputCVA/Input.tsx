import React, { type InputHTMLAttributes } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { inputCVA } from './input.cva'
import clsx from 'clsx'
import './input.modal.css'

type Props = {
  label?: string,
  error?: string,
  success?: boolean
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>
  & VariantProps<typeof inputCVA>

const Input = React.forwardRef<HTMLInputElement, Props>(({label, error, size, variant, className, ...props}, ref) => {
  return (
    <div>
          {label && (
          <label className="input-label">
            {label}
          </label>
          )}

          <input ref={ref}
                 className={
                    clsx(inputCVA({
                        size,
                        variant: error ? 'error' : 'default',
                    }),
                     className
                    )}
                    {...props}
               />  
         {error && (
          <span className="input-error">
            {error}
          </span>
         )}
    </div>
  )
}
)    //closing tag for forwrdRef

Input.displayName = 'Input'

export default Input