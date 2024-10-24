import { FC } from "react";
import Button from "../../components/Button/Button";
import st from './Error.module.css';

interface ErrorProps {
    message?: string 
    code?: number | string;  
    status?: string; 
    onClick: () => void
}

const Error: FC<ErrorProps> = ({ message, onClick, code }) => {
    return (
        <div className={st['error']}>
            <div className={st['content']}>
                <img src="/stop.png" alt="Иконка ошибки" />
                <p>{code}</p>
                <p>{message}</p>
            </div>
            <Button onClick={onClick}>Закрыть</Button>
        </div>
    );
}

export default Error;