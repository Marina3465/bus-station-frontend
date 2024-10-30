import { FC, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import Success from "../../components/Success/Success";
import Error from "../Error/Error";
import { useAddRouteMutation, useAddRouteStopsMutation, useDeleteRoutesMutation, useLazyGetBusesQuery, useLazyGetRoutesStopsQuery, useLazyGetStopReportQuery, useLazyGetStopsQuery } from "../../store/api/api";
import st from './Routes.module.css';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { r } from "../../fonts/roboto";
import { format } from "date-fns/format";

interface RoutesProps {

}

interface StopType {
    stop_id: number;
    stop_order: number;
    additional_price: number;
    departure: string;
    arrival: string;
}

const Routes: FC<RoutesProps> = () => {
    const [getRoutes, { data: routesData, error, isLoading: isLoadingStops }] = useLazyGetRoutesStopsQuery();
    const [getBuses, { data: busesData }] = useLazyGetBusesQuery();
    const [getStops, { data: stopsData }] = useLazyGetStopsQuery();
    const [getStopReport, { data: stopReportData }] = useLazyGetStopReportQuery();
    const [isGenerating, setIsGenerating] = useState(false);

    const [addRoute] = useAddRouteMutation();
    const [addRouteStops] = useAddRouteStopsMutation();

    const [deleteRoutes] = useDeleteRoutesMutation();

    const [openAdd, setOpenAdd] = useState<boolean>(false);

    const [nameRoute, setNameRoute] = useState<string>('');
    const [price, setPrice] = useState<number>();
    const [bus, setBus] = useState<number>();

    const [err, setErr] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const [messageErr, setMessageErr] = useState<string>('');
    const [stops, setStops] = useState<StopType[]>([{ stop_id: -1, stop_order: 0, additional_price: 0, departure: '', arrival: '' }]);

    useEffect(() => {
        try {
            getRoutes();
            getBuses();
            getStops();
            getStopReport();
        } catch (error) {
            console.error("Ошибка при получении маршрутов:", error);
            setMessageErr('Ошибка при получении маршрутов.');
            setErr(true);
        }
    }, [])

    const addStopBlock = () => {
        setStops([...stops, { stop_id: -1, stop_order: 0, additional_price: 0, departure: '', arrival: '' }]);
    };

    const handleStopChange = (index: number, field: keyof StopType, value: string | number) => {
        const newStops: StopType[] = [...stops];
        newStops[index][field] = value;
        setStops(newStops);
    };
    console.log(stops);

    const checkStops = () => {
        return stops.every(r =>
            r.stop_id !== -1 &&
            r.additional_price != null &&
            r.arrival !== "" &&
            r.departure !== "" &&
            r.stop_order != null
        );
    };


    const save = () => {
        if (nameRoute !== '' && price && bus && checkStops()) {

            try {
                addRoute({ name: nameRoute, bus_id: bus, standard_price: price }).then((result) => {
                    addRouteStops({ route_id: result.data, stops: stops })
                });
                getRoutes();
                setSuccess(true);
                setNameRoute('');
                setBus(0);
                setPrice(0);

                getStops();
            } catch (error) {
                console.error("Ошибка при добавлении маршрутов:", error);
                setMessageErr('Ошибка при добавлении маршрутов.');
                setErr(true);
            }
        } else {
            setMessageErr('Кажется, вы забыли заполнить все нужные поля!');
            setErr(true);
        }
    };

    const handleDelete = (id: number) => {
        if (id) {
            try {
                deleteRoutes({ id_route: id }).unwrap();
                getRoutes();
                setSuccess(true);
                getStops();
            } catch (error) {
                console.error("Ошибка при удалении остановки:", error);
                setMessageErr('Ошибка при удалении остановки.');
                setErr(true);
            }
        }
    }

    const exportPDF = () => {
        setIsGenerating(true);

        const doc = new jsPDF();

        // Добавьте шрифт в jsPDF
        doc.addFileToVFS("Roboto-Regular.ttf", r);
        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
        doc.setFont("Roboto");

        // Заголовок
        doc.text(`Маршруты`, 10, 10);

        const tableHeaders = [
            "Название Маршрута",
            "Стандартная Цена",
            "Название Остановки",
            "Дополнительная Цена",
            "Отправление",
            "Прибытие"
        ];
        if (stopReportData) {
            // Генерация строк таблицы на основе данных stopReportData
            const tableRows = stopReportData.map(route => [
                route.route_name,
                route.standard_price,
                route.stop_name,
                route.additional_price,
                format(new Date(route.departure), 'dd.MM.yyyy HH:mm'),
                format(new Date(route.arrival), 'dd.MM.yyyy HH:mm')
            ]);

            autoTable(doc, {
                head: [tableHeaders],
                body: tableRows,
                styles: { font: "Roboto" }
            });
        }

        doc.save("routes.pdf");
        setIsGenerating(false);
    }

    return (
        <>
            <Header />
            <div style={{ margin: '20px 50px' }}>
                <Button onClick={exportPDF} disabled={isGenerating}>
                    {isGenerating ? 'Генерация...' : 'Скачать информацию о маршрутах и остановках'}
                </Button>
            </div>
            <div className='btn-add'>
                <Button onClick={() => setOpenAdd(true)}>Добавить маршрут</Button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Маршрут</th>
                        <th>Номер <br />автобуса</th>
                        <th>Установочная <br />цена</th>
                        <th>Список остановок</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {routesData?.length ? (
                        routesData.map((r) => (
                            <tr key={r.id_route}>
                                <td>{r.id_route}</td>
                                <td>{r.route_name}</td>
                                <td>{r.bus_number}</td>
                                <td>{r.standard_price}</td>
                                <td>{r.stops_list}</td>

                                <td className="table-btn">
                                    <button className='btn' onClick={() => handleDelete(r.id_route)}>
                                        <img src="/delete.png" alt="Кнопка удалить" />

                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>Нет данных</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {(isLoadingStops) &&
                <Loading />
            }
            {err &&
                <Error onClick={() => setErr(false)} message={messageErr} />
            }
            {openAdd &&
                <Modal onClick={() => setOpenAdd(false)}>
                    <div className={st['cols']}>
                        <div className={st['col1']}>
                            <h1>Основная информация</h1>
                            <Input placeholder="Название маршрута" value={nameRoute} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameRoute(e.target.value)} />
                            <select value={bus} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setBus(Number(e.target.value))} name="" id="">
                                <option key={-1} value={-1}>Выберите автобус</option>
                                {busesData?.length &&
                                    busesData.map(r =>
                                        <option key={r.id_bus} value={r.id_bus}>{r.bus_number}</option>
                                    )
                                }
                            </select>
                            <Input placeholder="Установочная цена" type="number" value={String(price)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))} />
                        </div>
                        <div className={st['col2']}>
                            <h1>Создание остановок</h1>
                            {stops.map((stopBlock, index) => (
                                <div key={index} className={st['block-stop']}>
                                    <h2>Остановка</h2>
                                    <select
                                        value={stopBlock.stop_id}
                                        onChange={(e) => handleStopChange(index, 'stop_id', Number(e.target.value))}
                                    >
                                        <option value={-1}>Выберите остановку</option>
                                        {stopsData?.length &&
                                            stopsData.map((r) => (
                                                <option key={r.id_stop} value={r.id_stop}>{r.name}</option>
                                            ))
                                        }
                                    </select>

                                    <label htmlFor={`stop_order`}>Номер остановки</label>

                                    <Input
                                        placeholder="Номер остановки"
                                        type="number"
                                        id="stop_order"
                                        value={String(stopBlock.stop_order)}
                                        onChange={(e) => handleStopChange(index, 'stop_order', Number(e.target.value))}
                                    />

                                    <label htmlFor={`additional_price`}>Добавочная цена</label>

                                    <Input
                                        placeholder="Добавочная цена"
                                        type="number"
                                        id="additional_price"
                                        value={String(stopBlock.additional_price)}
                                        onChange={(e) => handleStopChange(index, 'additional_price', Number(e.target.value))}
                                    />

                                    <label htmlFor={`departure-${index}`}>Дата отправления</label>
                                    <Input
                                        type="datetime-local"
                                        id={`departure-${index}`}
                                        placeholder="Дата отправления"
                                        value={stopBlock.departure}
                                        onChange={(e) => handleStopChange(index, 'departure', e.target.value)}
                                    />

                                    <label htmlFor={`arrival-${index}`}>Дата прибытия</label>
                                    <Input
                                        type="datetime-local"
                                        id={`arrival-${index}`}
                                        placeholder="Дата прибытия"
                                        value={stopBlock.arrival}
                                        onChange={(e) => handleStopChange(index, 'arrival', e.target.value)}
                                    />
                                </div>
                            ))}

                            <Button onClick={addStopBlock}>Добавить остановку</Button>
                        </div>

                    </div>


                    <div style={{ marginBottom: '20px' }}></div>
                    <Button onClick={save}>Сохранить</Button>
                </Modal>
            }

            {success &&
                <Success onClick={() => setSuccess(false)} />
            }
        </>
    );
}

export default Routes;