import {cva, type VariantProps} from 'class-variance-authority'
import styles from './Button.module.css'

const buttonVariants = cva(styles.base,{
    variants: {
        intent:{
            primary: styles.primary,
            secondary: styles.secondary,
            outline: styles.outline,
        },
          size:{
             small: 'primary',
             large: 'small'
        }
    },
    defaultVariants:{
        intent:'primary',
        size: 'small'
    }
})

type ButtonProps = {
  
} & React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

export const Button = ({intent, size, ...props}: ButtonProps) => {
    return <button className={buttonVariants({intent, size})} {...props}></button>
}