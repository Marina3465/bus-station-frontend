import { FC, useState } from "react";
import Search from "../../components/Search/Search";
import Card from "../../components/Card/Card";
import { format } from "date-fns";
import Loading from "../../components/Loading/Loading";
import { useLazyGetRoutesQuery } from "../../store/api/api";

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

const Schedule: FC<ScheduleProps> = () => {

    const [getData, { data, error, isLoading }] = useLazyGetRoutesQuery();

    const [fromCity, setFromCity] = useState<string>('Краснодар');
    const [toCity, setToCity] = useState<string>();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date('2024-10-17'));

    const searchRoutes = () => {
        if (fromCity && toCity && selectedDate)
            getData({ start_stop_name: fromCity, end_stop_name: toCity, date: format(selectedDate, 'yyyy-MM-dd') });
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
                    <Card key={r.route_id} data={r} />
                ))
            ) : (
                <p>No routes found.</p> // Сообщение, если данных нет
            )}

            {isLoading &&
                <Loading />
            }
        </>
    );
}

export default Schedule;