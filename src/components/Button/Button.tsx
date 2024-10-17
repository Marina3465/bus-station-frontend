import { FC, ReactNode } from "react";
import st from './Button.module.css';

interface ButtonProps {
    children: ReactNode
}
 
const Button: FC<ButtonProps> = ({children}) => {
    return ( 
        <button className={st['button']}>{children}</button>
     );
}
 
export default Button;