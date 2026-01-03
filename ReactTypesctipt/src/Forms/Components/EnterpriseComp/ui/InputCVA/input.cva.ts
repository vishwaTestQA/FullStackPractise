import {cva} from 'class-variance-authority'

export const inputCVA = cva('input',{
   variants:{
     size:{
        sm: 'input--sm',
        md: 'input--md',
        lg: 'input--lg'
     },
     variant:{
        default: 'input--default',
        error: 'input--error',
        success: 'input--success'
     }
   },
   defaultVariants:{
    size: 'md',
    variant: 'default'
   }
})