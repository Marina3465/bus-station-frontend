import { FC } from "react";
import st from './Input.module.css';

interface InputProps {
    placeholder: string,
    id?: string,
    value: string | Date | undefined,
    type?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = (props) => {
    const formattedValue = props.type === 'date' && props.value instanceof Date
        ? props.value.toISOString().split('T')[0]
        : props.value?.toString();

    return (
        <input className={st['input']} id={props.id} type={props.type ? props.type : 'text'} placeholder={props.placeholder} value={formattedValue || ''}
        onChange={props.onChange} />
    );
}

export default Input;