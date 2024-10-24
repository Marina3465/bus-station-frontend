import { FC, useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import Card from "../../components/Card/Card";
import { format } from "date-fns";
import Loading from "../../components/Loading/Loading";
import { useLazyGetRoutesQuery } from "../../store/api/api";
import st from './Schedule.module.css';
import Error from "../Error/Error";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit/react";
import Module from "../../components/Modal/Modal";
import BuyTicket from "../../components/BuyTicket/BuyTicket";

interface ScheduleProps {

}

export interface IRoutes {
    route_id: number,
    start_stop_id: number,
    end_stop_id: number,
    route_name: string,
    start_stop_name: string,
    end_stop_name: string,
    departure: string,
    arrival: string,
    base_price: number,
    total_price: number,
    capacity: number,
    sold_tickets: number
}

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
    if ('status' in error) {
        const fetchError = error as FetchBaseQueryError;
        return {
            message: fetchError.data ? (fetchError.data as { message?: string }).message : 'Ошибка на стороне сервера',
            code: fetchError.status,
            status: fetchError.status ? `Статус: ${fetchError.status}` : undefined
        };
    } else if ('message' in error) {
        const serializedError = error as SerializedError;
        return {
            message: serializedError.message,
            code: undefined,
            status: undefined
        };
    }
    return { message: 'Неизвестная ошибка', code: undefined, status: undefined };
};

const Schedule: FC<ScheduleProps> = () => {

    const [getData, { data, error, isLoading }] = useLazyGetRoutesQuery();

    const [fromCity, setFromCity] = useState<string>('Краснодар');
    const [toCity, setToCity] = useState<string>();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date('2024-10-17'));
    const [err, setErr] = useState<boolean>(false);
    const [messageErr, setMessageErr] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedRoute, setSelectedRoute] = useState<number | undefined>();

    useEffect(() => {
        if (error) {
            const { message } = getErrorMessage(error);
            setMessageErr(message || 'Произошла ошибка');
            setErr(true);
        }
    }, [error]);

    const searchRoutes = () => {
        if (fromCity && toCity && selectedDate)
            getData({ start_stop_name: fromCity, end_stop_name: toCity, date: format(selectedDate, 'yyyy-MM-dd') });
        else {
            setMessageErr('Кажется вы забыли заполнить одно из полей: откуда, куда, когда!');
            setErr(true);
        }
    }

    return (
        <>
            <Search
                onClick={searchRoutes}
                fromCity={fromCity}
                setFromCity={setFromCity}
                toCity={toCity}
                setToCity={setToCity}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            {data?.length ? (
                data.map((r: IRoutes) => (
                    <Card key={r.route_id} data={r} onClick={
                        () => {
                            setOpenModal(true);
                            setSelectedRoute(r.route_id);
                        }} />
                ))
            ) : (
                <p className={st['message']}>Маршруты не найдены</p>
            )}

            {isLoading &&
                <Loading />
            }

            {err &&
                <Error onClick={() => setErr(false)} message={messageErr} />
            }

            {(openModal && selectedRoute) &&
                <Module onClick={() => setOpenModal(false)}>
                    {data?.length &&
                        data?.filter((r: IRoutes) => (r.route_id === selectedRoute)).map(filtredRoute => (
                            <BuyTicket data={filtredRoute} key={filtredRoute.route_id}/>
                        ))
                    }
                </Module>
            }
        </>
    );
}

export default Schedule;