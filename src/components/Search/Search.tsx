import { FC, ReactNode } from "react";
import st from './Search.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import InputDate from "../InputDate/InputDate";

interface SearchProps {
}

const Search: FC<SearchProps> = (props) => {



    const searchRoutes = () => {
        // props.trigger({ start_stop_id: 1, end_stop_id: 11, date: '2024-10-17' });

    }

    return (
        <div className={st['conteiner']}>
            <div className={st['black-conteiner']}>
                <img className={st['logo']} src="/logo.png" alt="Логотип компании" />
                <div className={st['search-conteiner']}>
                    <div className={st['inputs']}>
                        <Input placeholder="Откуда" value="" />
                        <Input placeholder="Куда" value="" />
                        <InputDate placeholder="Когда" />
                    </div>
                    {/* <Button onClick={searchRoutes}>Найти билеты</Button> */}
                </div>
            </div>
        </div>
    );
}

export default Search;