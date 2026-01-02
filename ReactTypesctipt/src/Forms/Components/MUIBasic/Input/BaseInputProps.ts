export type BaseInputPropsMui<T> = {
    label?: string,
    value?: T,
    error?: string,
    required?: boolean,
    disabled?: boolean,
    onChange?: (v: T) => void
}