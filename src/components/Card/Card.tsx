import { FC } from "react";
import st from './Card.module.css';
import { IRoutes } from "../../pages/Schedule/Schedule";
import Button from "../Button/Button";
import { differenceInMinutes, format, parseISO } from "date-fns";

interface CardProps {
    data: IRoutes,
    onClick: () => void
}

const Card: FC<CardProps> = (props) => {

    const departureDate = parseISO(props.data.departure);
    const arrivalDate = parseISO(props.data.arrival);

    const totalMinutes = differenceInMinutes(arrivalDate, departureDate);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return (
        <div className={st['card']} key={props.data.route_id}>
            <div className={st['card-header']}>
                <p>Рейс № {props.data.route_id}</p>
                <p>{props.data.route_name}</p>
            </div>
            <div className={st['card-body']}>
                <div className={st['departure']}>
                    <p className={st['header']}>Отправление</p>
                    <p>{format(props.data.departure, 'dd.MM.yyyy HH:mm')}</p>
                    <p>{props.data.start_stop_name}</p>
                </div>
                <div className={st['img']}>
                    <p>{hours} ч. {minutes} мин.</p>
                </div>
                <div className={st['arrival']}>
                    <p className={st['header']}>Прибытие</p>
                    <p>{format(props.data.arrival, 'dd.MM.yyyy HH:mm')}</p>
                    <p>{props.data.end_stop_name}</p>
                </div>
                <div className={st['button-price']}>
                    <p className={st['header']}>Цена {props.data.total_price} ₽</p>
                    <p >Осталось мест: {props.data.capacity - props.data.sold_tickets}</p>
                    <Button onClick={props.onClick}>Купить билет</Button>
                </div>
            </div>

        </div>
    );
}

export default Card;