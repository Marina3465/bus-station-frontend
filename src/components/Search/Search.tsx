import { FC } from "react";
import st from './Search.module.css';
import Input from "../Input/Input";
import Button from "../Button/Button";

interface SearchProps {
    fromCity: string | undefined;
    setFromCity: (value: string) => void;
    toCity: string | undefined;
    setToCity: (value: string) => void;
    selectedDate: Date;
    setSelectedDate: (value: Date) => void;
    onClick: () => void;
}

const Search: FC<SearchProps> = (props) => {

    const handleGetFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setFromCity(event.target.value);
    }

    const handleGetTo = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setToCity(event.target.value);
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setSelectedDate(new Date(event.target.value));
    };

    return (
        <div className={st['conteiner']}>
            <div className={st['black-conteiner']}>
                <img className={st['logo']} src="/logo.png" alt="Логотип компании" />
                <div className={st['search-conteiner']}>
                    <div className={st['inputs']}>
                        <Input placeholder="Откуда" value={props.fromCity} onChange={handleGetFrom} />
                        <Input placeholder="Куда" value={props.toCity} onChange={handleGetTo} />
                        <Input placeholder="Когда" value={props.selectedDate} onChange={handleDateChange} type="date" />
                    </div>
                    <Button onClick={props.onClick}>Найти билеты</Button>
                </div>
            </div>
        </div>
    );
}

export default Search;