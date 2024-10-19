import { FC } from "react";
import Search from "../../components/Search/Search";
import Loading from "../../components/Loading/Loading";
import Cart from "../../components/Cart/Cart";
import { useLazyGetRoutesQuery } from "../../store/api/api";
import Button from "../../components/Button/Button";

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

    const [trigger, { data: routes, error, isLoading }] = useLazyGetRoutesQuery();

    
    const searchRoutes = () => {
        trigger({ start_stop_id: 1, end_stop_id: 11, date: '2024-10-17' });

    }


    return (
        <>
            <Search />
            <Button onClick={searchRoutes}>Найти билеты</Button>

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