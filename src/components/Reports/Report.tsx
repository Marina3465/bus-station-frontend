import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { r } from '../../fonts/roboto';

export interface ReportData {
    id: number;
    name: string;
    info: string;
}

interface ReportProps {
    data: ReportData[];
}

const Report: React.FC<ReportProps> = ({ data }) => {
    const [isGenerating, setIsGenerating] = useState(false);


    const exportPDF = () => {
        setIsGenerating(true);

        const doc = new jsPDF();
        
        // Добавьте шрифт в jsPDF
        doc.addFileToVFS("Roboto-Regular.ttf", r);
        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
        doc.setFont("Roboto");

        // Заголовок
        doc.text("Отчет", 10, 10);

        // Данные таблицы
        const tableColumn = ["ID", "Имя", "Данные"];
        const tableRows = data.map((row) => [
            row.id.toString(),
            row.name,
            row.info,
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            styles: { font: "Roboto" },
        });

        doc.save("report.pdf");
        setIsGenerating(false);
    };

    return (
        <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Данные</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.info}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={exportPDF} disabled={isGenerating}>
                {isGenerating ? 'Генерация...' : 'Создать отчет'}
            </button>
        </div>
    );
};

export default Report;
