
// Text input component has its own type

type Props = {
    id?: string,
    label?: string,
    error?: string | undefined
    value?: string| number,
    onChange?: (v:string) => void,
    disabled?: boolean
}

const TextComponent:React.FC<Props> = ({label, id, error, value, onChange, disabled}) => {
  return <div>
     <label htmlFor={id}>{label}</label>
      {/* belw onChnage is similar to onChange={(e) => onChange ? onChange(e.target.value): undefined} */}
     <input type='text' id={id} value={value} disabled={disabled} onChange={(e) => onChange?.(e.target.value)}/>
     {error && <span>{error}</span>}
  </div>
}

export default TextComponent