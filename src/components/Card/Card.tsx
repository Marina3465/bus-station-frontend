import { FC } from "react";
import st from './Card.module.css';
import { IRoutes } from "../../pages/Schedule/Schedule";
import Button from "../Button/Button";

interface CardProps {
    data: IRoutes
}

const Card: FC<CardProps> = (props) => {
    return (
        <div className={st['card']} key={props.data.route_id}>
            <div className={st['card-header']}>
                <p>Рейс № {props.data.route_id}</p>
                <p>{props.data.route_name}</p>
            </div>
            <div className={st['card-body']}>
                <div className={st['departure']}>
                    <p className={st['header']}>Отправление</p>
                    <p>{props.data.departure}</p>
                    <p>{props.data.start_stop_name}</p>
                </div>
                <div className={st['img']}></div>
                <div className={st['arrival']}>
                    <p className={st['header']}>Прибытие</p>
                    <p>{props.data.arrival}</p>
                    <p>{props.data.end_stop_name}</p>
                </div>
                <div className={st['button-price']}>
                    <p className={st['header']}>Цена {props.data.total_price} ₽</p>
                    <p >Осталось мест: {props.data.capacity-props.data.sold_tickets}</p>
                    <Button>Купить билет</Button>

                </div>
            </div>
           
        </div>
    );
}

export default Card;