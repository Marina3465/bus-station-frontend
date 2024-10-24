import { FC, useEffect, useState } from "react";
import { getErrorMessage, IRoutes } from "../../pages/Schedule/Schedule";
import st from './BuyTicket.module.css';
import { format } from "date-fns";
import Button from "../Button/Button";
import Payment from "../Payment/Payment";
import { useAddTicketMutation } from "../../store/api/api";
import Loading from "../Loading/Loading";
import Error from "../../pages/Error/Error";

interface BuyTicketProps {
    data: IRoutes
}

const BuyTicket: FC<BuyTicketProps> = (props) => {
    const [hasBaggage, setHasBaggage] = useState(false);
    const [cash, setCash] = useState<boolean>(false);
    const [err, setErr] = useState<boolean>(false);
    const [messageErr, setMessageErr] = useState<string>('');


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHasBaggage(event.target.checked);
    };

    const [addTicket, { isLoading, error }] = useAddTicketMutation();

    const handleAddTicket = async () => {

        await addTicket({
            stop_from_id: props.data.start_stop_id,
            stop_to_id: props.data.end_stop_id,
            price: hasBaggage ? props.data.total_price + 100 : props.data.total_price,
            purchase_date: format(new Date(), 'yyyy-MM-dd HH:mm:SS'),
            baggage: hasBaggage
        }).unwrap(); 

    };

    useEffect(() => {
        if (error) {
            const { message } = getErrorMessage(error);
            setMessageErr(message || 'Произошла ошибка');
            setErr(true);
        }
    }, [error]);

    return (
        <>
            <div>
                <div className={st['route-name']}>
                    <p>Рейс №{props.data.route_id}</p>
                    <p>{props.data.route_name}</p>
                </div>
                <div className={st['header']}>
                    <div>От</div>
                    <div className={st['from']}>{props.data.start_stop_name.toLocaleUpperCase()}</div>
                    <div>{format(props.data.departure, 'dd.MM.yyyy HH:mm')}</div>
                    <div>До</div>
                    <div className={st['to']}>{props.data.end_stop_name.toLocaleUpperCase()}</div>
                    <div>{format(props.data.arrival, 'dd.MM.yyyy HH:mm')}</div>
                </div>
                <div className={st['baggage']}>
                    <label htmlFor="baggage">Багаж +100 ₽</label>
                    <input
                        type="checkbox"
                        name="baggage"
                        id="baggage"
                        checked={hasBaggage}
                        onChange={handleCheckboxChange}
                    />
                </div>
                <div>Стоимость: {hasBaggage ? props.data.total_price + 100 : props.data.total_price} ₽</div>
                <div className={st['btn-pay']}>
                    <Button onClick={handleAddTicket}>Оплатить</Button>
                </div>
            </div>
            {cash &&
                <Payment onClick={() => setCash(false)} />
            }
            {isLoading &&
                <Loading />
            }
            {err &&
                <Error onClick={() => setErr(false)} message={messageErr} />
            }
        </>
    );
}

export default BuyTicket;