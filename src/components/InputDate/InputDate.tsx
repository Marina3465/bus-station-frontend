import { FC } from "react";
import st from './InputDate.module.css';

interface InputDateProps {
    placeholder: string,
}

const InputDate: FC<InputDateProps> = (props) => {
    return (
        <input className={st['date-input']} type="date" placeholder={props.placeholder}  />
    );
}

export default InputDate;