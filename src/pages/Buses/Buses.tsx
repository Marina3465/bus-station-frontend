import React, { FC, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useAddBusMutation, useDeleteBusMutation, useLazyGetBusesQuery, useLazyGetDriversQuery, useUpdateBusMutation } from "../../store/api/api";
import Loading from "../../components/Loading/Loading";
import Error from "../Error/Error";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Success from "../../components/Success/Success";
import st from './Buses.module.css';

interface BusesProps {

}

interface ISelectedDriver{
    value: number
    label: string
}

const Buses: FC<BusesProps> = () => {
    const [getDrivers, { data: driversData }] = useLazyGetDriversQuery();
    const [getBuses, { data: BusesData, error, isLoading: isLoadingBuses }] = useLazyGetBusesQuery();
    const [addBus] = useAddBusMutation();
    const [updateBus] = useUpdateBusMutation();
    const [deleteBus] = useDeleteBusMutation();

    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [id, setId] = useState<number>();

    const [numberBus, setNumberBus] = useState<string>('');
    const [capacityBus, setCapacityBus] = useState<number | undefined>();
    const [selectedDriver, setSelectedDriver] = useState<number | undefined>();
    const [numberEditBus, setNumberEditBus] = useState<string>('');
    const [capacityEditBus, setCapacityEditBus] = useState<number | undefined>();
    const [selectedEditDriver, setSelectedEditDriver] = useState<number | undefined>();
    const [err, setErr] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const [messageErr, setMessageErr] = useState<string>('');

    useEffect(() => {
        try {
            getBuses();
        } catch (error) {
            console.error("Ошибка при получении автобуса:", error);
            setMessageErr('Ошибка при получении автобуса.');
            setErr(true);
        }
        try {
            getDrivers();
        } catch (error) {
            console.error("Ошибка при получении водетелей:", error);
            setMessageErr('Ошибка при получении водетилей.');
            setErr(true);
        }
    }, [])

    const save = () => {
        if (numberBus !== '' && capacityBus !== undefined && selectedDriver !== undefined && !Number.isNaN(selectedDriver)) {
            try {
                addBus({ bus_number: numberBus, capacity:capacityBus, driver_name:selectedDriver }).unwrap();

                setSuccess(true);
                setNumberBus('');
                setCapacityBus(0);
                setSelectedDriver(-1);

                getBuses();
            } catch (error) {
                console.error("Ошибка при добавлении автобуса:", error);
                setMessageErr('Ошибка при добавлении автобуса.');
                setErr(true);
            }
        } else {
            setMessageErr('Кажется, вы не заполнили все поля!');
            setErr(true);
        }
    };

    const saveEdit = () => {
        if (id && numberEditBus !== '' && capacityEditBus !== undefined && selectedEditDriver !== undefined && !Number.isNaN(selectedEditDriver)) {
            try {
                updateBus({ id_bus: id, bus_number: numberEditBus, capacity:capacityEditBus, driver_name:selectedEditDriver }).unwrap();

                setSuccess(true);

                getBuses();
            } catch (error) {
                console.error("Ошибка при добавлении автобуса:", error);
                setMessageErr('Ошибка при добавлении автобуса.');
                setErr(true);
            }
        } else {
            setMessageErr('Кажется, вы не заполнили все поля!');
            setErr(true);
        }
    }

    const handleDelete = (id: number) => {
        if (id) {
            try {
                deleteBus({ id_bus: id }).unwrap();

                setSuccess(true);
                getBuses();
            } catch (error) {
                console.error("Ошибка при удалении автобуса:", error);
                setMessageErr('Ошибка при удалении автобуса.');
                setErr(true);
            }
        }
    }

    return (
        <>
            <Header />
            <div className='btn-add'>
                <Button onClick={() => setOpenAdd(true)}>Добавить автобус</Button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Номер автобуса</th>
                        <th>Вместимость</th>
                        <th>Водитель</th>
                        <th>Изменить</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {BusesData?.length ? (
                        BusesData.map((r) => (
                            <tr key={r.id_bus}>
                                <td>{r.bus_number}</td>
                                <td>{r.capacity}</td>
                                <td>{r.driver_name}</td>
                                <td className="table-btn">
                                    <button className='btn' onClick={() => { setId(r.id_bus); setNumberEditBus(r.bus_number); setCapacityEditBus(r.capacity); setSelectedEditDriver(r.driver_id); setOpenEdit(true) }}>
                                        <img src="/edit.png" alt="Кнопка редактировать" />
                                    </button>
                                </td>
                                <td className="table-btn">
                                    <button className='btn' onClick={() => handleDelete(r.id_bus)}>
                                        <img src="/delete.png" alt="Кнопка удалить" />

                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>Нет данных</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {(isLoadingBuses) &&
                <Loading />
            }
            {err &&
                <Error onClick={() => setErr(false)} message={messageErr} />
            }
            {openAdd &&
                <Modal onClick={() => setOpenAdd(false)}>
                    <div className={st['modal-content']}>
                        <Input placeholder="Номер автобуса" value={numberBus} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumberBus(e.target.value)} />
                        <Input placeholder="Вместимость" type="number" value={capacityBus} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCapacityBus(Number(e.target.value))} />
                        <select value={selectedDriver} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDriver(Number(e.target.value))}>
                        <option key={-1}>Выберите водителя</option>
                            {driversData?.length &&
                                driversData.map(r => (
                                    <option key={r.id_driver} value={r.id_driver}>{r.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div style={{ marginBottom: '40px' }}></div>
                    <Button onClick={save}>Сохранить</Button>
                </Modal>
            }
            {openEdit &&
                <Modal onClick={() => setOpenEdit(false)}>
                    <div className={st['modal-content']}>
                        <Input placeholder="Номер автобуса" value={numberEditBus} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumberEditBus(e.target.value)} />
                        <Input placeholder="Вместимость" type="number" value={capacityEditBus} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCapacityEditBus(Number(e.target.value))} />
                        <select value={selectedEditDriver} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedEditDriver(Number(e.target.value))}>
                        <option key={-1}>Выберите водителя</option>
                            {driversData?.length &&
                                driversData.map(r => (
                                    <option key={r.id_driver} value={r.id_driver}>{r.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div style={{ marginBottom: '40px' }}></div>
                    <Button onClick={saveEdit}>Сохранить</Button>
                </Modal>
            }

            {success &&
                <Success onClick={() => setSuccess(false)} />
            }
        </>
    );
}

export default Buses;