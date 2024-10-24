import { FC, ReactNode } from "react";
import st from './Payment.module.css';

interface PaymentProps {
    onClick: () => void
}

const Payment: FC<PaymentProps> = ({ onClick }) => {
    return (
        <div className={st['module-bg']}>
            <div className={st['module']}>
                <button onClick={onClick} className={st['btn-close']}><img src="/close.png" alt="Кнопка закрыть" /></button>
                <div>Оплата прошла успешно</div>
            </div>
        </div>
    );
}

export default Payment;