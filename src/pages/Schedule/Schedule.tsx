import { FC, useState } from "react";
import Search from "../../components/Search/Search";
import Cart from "../../components/Cart/Cart";
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
    total_price: number
}

const Schedule: FC<ScheduleProps> = () => {

    const [getData, { data: routes, error, isLoading }] = useLazyGetRoutesQuery();
    // const [getStopName, { data: stopName }] = useLazyGetStopIdQuery();


    const [fromCity, setFromCity] = useState<string>();
    const [toCity, setToCity] = useState<string>();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date('2024-10-17'));

    const searchRoutes = () => {            
            getData({ start_stop_name: 'Краснодар', end_stop_name:'Горячий ключ', date: format(selectedDate, 'yyyy-MM-dd') });      
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
            <Cart />
            {routes?.map((r: IRoutes) => {
                <div key={r.route_id}>
                    <p>{r.route_name}</p>
                </div>
            })}
            {isLoading &&
                <Loading />
            }
        </>
    );
}

export default Schedule;