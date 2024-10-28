import { FC } from "react";
import st from './Header.module.css';
import { NavLink } from "react-router-dom";

interface HeaderProps {

}

const Header: FC<HeaderProps> = () => {
    return (
        <header className={st['header']}>
            <menu>
                <ul className={st['links']}>
                    <NavLink
                        to={'/'}
                        className={({ isActive }) => `${st.link} ${isActive ? st.active : ''}`}>
                        Покупка билета
                    </NavLink>
                    <NavLink to={'/drivers'} className={({ isActive }) => `${st.link} ${isActive ? st.active : ''}`}>Водители</NavLink>
                    <NavLink to={'/buses'} className={({ isActive }) => `${st.link} ${isActive ? st.active : ''}`}>Автобусы</NavLink>
                    <NavLink to={'/routes'} className={({ isActive }) => `${st.link} ${isActive ? st.active : ''}`}>Маршруты</NavLink>
                    <NavLink to={'/stops'} className={({ isActive }) => `${st.link} ${isActive ? st.active : ''}`}>Остановки</NavLink>
                    <NavLink to={'/tickets'} className={({ isActive }) => `${st.link} ${isActive ? st.active : ''}`}>Билеты</NavLink>
                </ul>
            </menu>
        </header>
    );
}

export default Header;