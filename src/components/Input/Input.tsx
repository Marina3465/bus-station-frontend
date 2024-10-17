import { FC } from "react";
import st from './Input.module.css';

interface InputProps {
    placeholder: string,
    value: string
}

const Input: FC<InputProps> = (props) => {
    return (
        <input className={st['input']} type="text" placeholder={props.placeholder} value={props.value} />
    );
}

export default Input;