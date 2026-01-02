import styled, {css} from 'styled-components'


type ButtonVariants = 'primary' | 'secondary' | 'danger'

type buttonSize = 'sm' | 'md' | 'lg'

export const StyledButton = styled.button<{
   variant: ButtonVariants;
   size: buttonSize;
}>`
padding: 8px 16px;
border-radius: 4px;
border:none;
font-weight: 500;
white-space: nowrap;
&:disabled {
opacity: 0.6;
cursor: not-allowed;
}

/* background-color: ${({variant}) => 
  variant === 'primary' ? '#2563eb' : '#e537eb'
} */

font-size: clamp(0.85rem, 1vw, 1rem)     

padding: clamp(0.45rem, 0.8vw, 0.6rem) clamp(0.8rem, 1.5rem, 1.1rem);

${({size}) => 
  size === 'sm' && css`
    font-size: clamp(0.7rem, 0.9rem, 0.85rem)
 `}

 ${({size}) => 
  size === 'lg' && css`
    font-size: clamp(0.95rem, 1.1vw, 1.1rem)
 `}

 /* -------variants -------- */
 ${({variant}) => variant === 'primary' && css`
    background-color: #2563eb;
    color: white;

    &:hover:not(:disabled){
      background-color: #d1d5db
    }
 `}

  ${({variant}) => variant === 'secondary' && css`
    background-color: #e537eb;
    color: #111827;

    &:hover:not(:disabled){
      background-color: #d1d5db
    }
 `}

   ${({variant}) => variant === 'danger' && css`
    background-color: #dc2626;
    color: #111827;

    &:hover:not(:disabled){
      background-color: white;
    }
 `}
`;
