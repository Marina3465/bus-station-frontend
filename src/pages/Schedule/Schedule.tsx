import { FC } from "react";
import Search from "../../components/Search/Search";
import Loading from "../../components/Loading/Loading";
import Cart from "../../components/Cart/Cart";

interface ScheduleProps {

}

const Schedule: FC<ScheduleProps> = () => {
    return (
        <>
            <Search />
            <Cart />
            {/* <Loading /> */}
        </>
    );
}

export default Schedule;