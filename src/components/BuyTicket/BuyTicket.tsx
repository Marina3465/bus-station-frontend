import { FC, useEffect, useState } from "react";
import { getErrorMessage, IRoutes } from "../../pages/Schedule/Schedule";
import st from './BuyTicket.module.css';
import { format } from "date-fns";
import Button from "../Button/Button";
import Success from "../Success/Success";
import { useAddTicketMutation } from "../../store/api/api";
import Loading from "../Loading/Loading";
import Error from "../../pages/Error/Error";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import { r } from "../../fonts/roboto";

interface BuyTicketProps {
    data: IRoutes
}

const BuyTicket: FC<BuyTicketProps> = (props) => {
    const [hasBaggage, setHasBaggage] = useState(false);
    const [cash, setCash] = useState<boolean>(false);
    const [err, setErr] = useState<boolean>(false);
    const [messageErr, setMessageErr] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);


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
        }).unwrap().then(()=>setCash(true));

    };

    useEffect(() => {
        if (error) {
            const { message } = getErrorMessage(error);
            setMessageErr(message || 'Произошла ошибка');
            setErr(true);
        }
    }, [error]);

    const exportPDF = () => {
        setIsGenerating(true);

        const doc = new jsPDF();

        // Добавьте шрифт в jsPDF
        doc.addFileToVFS("Roboto-Regular.ttf", r);
        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
        doc.setFont("Roboto");

        // Заголовок
        doc.text(`Рейс №${props.data.route_id} ${props.data.route_name}`, 10, 10);

        // Данные таблицы
        const tableRows =  [
            ["ОТ", `${props.data.start_stop_name}`, `${format(props.data.arrival, 'dd.MM.yyyy HH:mm')}`],
            ["ДО", `${props.data.end_stop_name}`, `${format(props.data.departure, 'dd.MM.yyyy HH:mm')}`],
        ];

        autoTable(doc, {
            body: tableRows,
            styles: { font: "Roboto" },
        });
        doc.text(`Багаж ${hasBaggage ? 'Да' : 'Нет'}`, 10, 50);
        doc.text(`Стоимость ${props.data.total_price} руб.`, 10, 60);

        doc.save("ticket.pdf");
        setIsGenerating(false);
    }

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
                <Success onClick={() => setCash(false)}>
                    <div style={{marginTop: '20px'}}></div>
                    <Button onClick={exportPDF} disabled={isGenerating}>
                        {isGenerating ? 'Генерация...' : 'Скачать билет'}
                    </Button>
                </Success>
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