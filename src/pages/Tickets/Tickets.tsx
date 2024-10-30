import { FC, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useLazyGetTicketsQuery } from "../../store/api/api";
import Loading from "../../components/Loading/Loading";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { r } from "../../fonts/roboto";
import Button from "../../components/Button/Button";

interface TicketsProps {

}

const Tickets: FC<TicketsProps> = () => {
    const [getTickets, { data, isLoading }] = useLazyGetTicketsQuery();
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        getTickets();
    }, [])

    const exportPDF = () => {
        setIsGenerating(true);

        const doc = new jsPDF();

        // Добавьте шрифт в jsPDF
        doc.addFileToVFS("Roboto-Regular.ttf", r);
        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
        doc.setFont("Roboto");

        // Заголовок
        doc.text(`Проданные билеты`, 10, 10);

        // Данные таблицы
        const tableHead = [
            '№',
            'Маршрут',
            'От',
            'Дата',
            'До',
            'Дата',
            'Стоимость',
            'Дата полупки',
            'Багаж'
        ]
        const tableRows = data?.map(row => [
            row.id_route.toString(),
            row.route_name,
            row.start_stop_name,
            format(row.departure, 'dd.MM.yyyy HH:mm'),
            row.end_stop_name,
            format(row.arrival, 'dd.MM.yyyy HH:mm'),
            row.price.toString(),
            format(row.purchase_date, 'dd.MM.yyyy HH:mm'),
            row.baggage ? 'Да' : 'Нет'
        ]);


        autoTable(doc, {
            head: [tableHead],
            body: tableRows,
            styles: { font: "Roboto" },
        });

        doc.save(`Проданные билеты на ${format(new Date(),'dd.MM.yyyy')}.pdf`);
        setIsGenerating(false);
    }

    return (
        <>
            <Header />
            <div style={{margin: '20px 10px'}}>
                <Button onClick={exportPDF} disabled={isGenerating}>
                    {isGenerating ? 'Генерация...' : 'Скачать информацию о проданных билетах'}
                </Button>
            </div>
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