import { FC } from "react";
import st from './Search.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import InputDate from "../InputDate/InputDate";

interface SearchProps {

}

const Search: FC<SearchProps> = () => {
    return (
        <div className={st['conteiner']}>
            <div className={st['black-conteiner']}>
                <img className={st['logo']} src="/logo.png" alt="Логотип компании" />
                <div className={st['search-conteiner']}>
                    <div className={st['inputs']}>
                        <Input placeholder="Откуда" value="Краснодар" />
                        <Input placeholder="Куда" value="" />
                        <InputDate placeholder="Когда"/>
                    </div>
                    <Button>Найти билеты</Button>
                </div>
            </div>
        </div>
    );
}

export default Search;