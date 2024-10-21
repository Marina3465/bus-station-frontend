import { FC, ReactNode } from "react";
import st from './Button.module.css';

interface ButtonProps {
    children: ReactNode,
    onClick: ()=>void
}
 
const Button: FC<ButtonProps> = (props) => {
    return ( 
        <button className={st['button']} onClick={props.onClick}>{props.children}</button>
     );
}
 
export default Button;