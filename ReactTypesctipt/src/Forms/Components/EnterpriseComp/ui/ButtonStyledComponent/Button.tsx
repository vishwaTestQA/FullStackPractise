import { StyledButton } from "./Button.style"


type ButtonVariants = 'primary' | 'secondary' | 'danger'

type buttonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: ButtonVariants
    size: buttonSize,
    loading?: boolean
    disabled?: boolean
    children?: React.ReactNode
}

const Button = ({variant, size, loading, disabled, children, ...props}: ButtonProps) => {
  return (
    //  <button className={`btn btn-${variant} btn-${size}`} 
    //          disabled={disabled || loading}
    //          {...props}
    //          >
    //     {loading ? 'Loading...' : children}
    // </button>
    <StyledButton variant={variant}   disabled={disabled || loading} size={size} {...props}>{loading? 'Loading...' : children}</StyledButton>
  )
}

export default Button