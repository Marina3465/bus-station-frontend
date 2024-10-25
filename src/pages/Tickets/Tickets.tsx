import { FC, useEffect } from "react";
import Header from "../../components/Header/Header";
import { useLazyGetTicketsQuery } from "../../store/api/api";
import Loading from "../../components/Loading/Loading";
import { format } from "date-fns";

interface TicketsProps {
    
}
 
const Tickets: FC<TicketsProps> = () => {
    const [getTickets, { data, error, isLoading }] = useLazyGetTicketsQuery();

    useEffect(() => {
        getTickets();
    }, [])
    return ( 
        <>
            <Header />
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Маршрут</th>
                        <th>От</th>
                        <th>Дата</th>
                        <th>До</th>
                        <th>Дата</th>
                        <th>Стоимость</th>
                        <th>Дата полупки</th>
                        <th>Багаж</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.length ? (
                        data.map((r) => (
                            <tr key={r.id_ticket}>
                                <td>{r.id_route}</td>
                                <td>{r.route_name}</td>
                                <td>{r.start_stop_name}</td>
                                <td>{format(r.departure, 'dd.MM.yy HH:mm')}</td>
                                <td>{r.end_stop_name}</td>
                                <td>{format(r.arrival, 'dd.MM.yy HH:mm')}</td>
                                <td>{r.price}</td>
                                <td>{format(r.purchase_date, 'dd.MM.yy HH:mm')}</td>
                                <td>{r.baggage ? 'Да' : 'Нет'}</td>                               
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>Нет данных</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isLoading &&
                <Loading />
            }
        </>
     );
}
 
export default Tickets;