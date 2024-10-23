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

interface ScheduleProps {

}
export interface IRoutes {
    route_id: number,
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

const getErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
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
    console.log(error);

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
                    <Card key={r.route_id} data={r} />
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
        </>
    );
}

export default Schedule;