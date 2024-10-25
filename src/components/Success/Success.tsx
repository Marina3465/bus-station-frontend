import { FC } from "react";
import st from './Success.module.css';

interface SuccessProps {
    onClick: () => void
}

const Success: FC<SuccessProps> = ({ onClick }) => {
    return (
        <div className={st['module-bg']}>
            <div className={st['module']}>
                <button onClick={onClick} className={st['btn-close']}><img src="/close.png" alt="Кнопка закрыть" /></button>
                <div>Успешно</div>
            </div>
        </div>
    );
}

export default Success;