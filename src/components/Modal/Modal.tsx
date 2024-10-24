import { FC, ReactNode } from "react";
import st from './Modal.module.css';

interface ModuleProps {
    children: ReactNode,
    onClick: () => void
}

const Module: FC<ModuleProps> = ({ children, onClick }) => {
    return (
        <div className={st['modal']}>
            <div className={st['modal-content']}>
                <button onClick={onClick} className={st['btn-close']}><img src="/close.png" alt="Кнопка закрыть" /></button>
                {children}
            </div>
        </div>
    );
}

export default Module;