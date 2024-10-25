import { FC, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useAddDriverMutation, useDeleteDriverMutation, useLazyGetDriversQuery, useUpdateDriverMutation } from "../../store/api/api";
import st from './Drivers.module.css';
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";
import Error from "../Error/Error";
import Success from "../../components/Success/Success";

interface DriversProps {

}

const Drivers: FC<DriversProps> = () => {
    const [getDrivers, { data: driversData, isLoading: isLoadingDrivers }] = useLazyGetDriversQuery();
    const [addDriver] = useAddDriverMutation();
    const [updateDriver] = useUpdateDriverMutation();
    const [deleteDriver] = useDeleteDriverMutation();

    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [id, setId] = useState<number>();

    const [nameDriver, setNameDriver] = useState<string>('');
    const [nameEditDriver, setNameEditDriver] = useState<string>('');

    const [err, setErr] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const [messageErr, setMessageErr] = useState<string>('');


    useEffect(() => {
        try {
            getDrivers();
        } catch (error) {
            console.error("Ошибка при получении водителя:", error);
            setMessageErr('Ошибка при получении водителя.');
            setErr(true);
        }
    }, [])

    const save = () => {
        if (nameDriver !== '') {
            try {
                addDriver({ name: nameDriver }).unwrap();

                setSuccess(true);
                setNameDriver('');

                getDrivers();
            } catch (error) {
                console.error("Ошибка при добавлении водителя:", error);
                setMessageErr('Ошибка при добавлении водителя.');
                setErr(true);
            }
        } else {
            setMessageErr('Кажется, вы забыли заполнить ФИО водителя!');
            setErr(true);
        }
    };

    const saveEdit = () => {
        if (nameEditDriver !== '' && id) {
            try {
                updateDriver({id_driver: id, name: nameEditDriver}).unwrap();

                setSuccess(true);
                setNameEditDriver('');

                getDrivers();
            } catch (error) {
                console.error("Ошибка при изменении водителя:", error);
                setMessageErr('Ошибка при изменении водителя.');
                setErr(true);
            }
        } else {
            setMessageErr('Кажется, вы забыли заполнить ФИО водителя!');
            setErr(true);
        }
    }

    const handleDelete = (id: number) => {
        if (id) {
            try {
                deleteDriver({id_driver: id}).unwrap();

                setSuccess(true);
                getDrivers();
            } catch (error) {
                console.error("Ошибка при удалении водителя:", error);
                setMessageErr('Ошибка при удалении водителя.');
                setErr(true);
            }
        } 
    }

    return (
        <>
            <Header />
            <div className={st['btn-add']}>
                <Button onClick={() => setOpenAdd(true)}>Добавить водителя</Button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ФИО водителей</th>
                        <th>Изменить</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {driversData?.length ? (
                        driversData.map((r) => (
                            <tr key={r.id_driver}>
                                <td>{r.name}</td>
                                <td className="table-btn">
                                    <button className={st['btn']} onClick={() => { setId(r.id_driver); setNameEditDriver(r.name); setOpenEdit(true) }}>
                                        <img src="/edit.png" alt="Кнопка редактировать" />
                                    </button>
                                </td>
                                <td className="table-btn">
                                    <button className={st['btn']} onClick={() => handleDelete(r.id_driver)}>
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
            {(isLoadingDrivers) &&
                <Loading />
            }
            {err &&
                <Error onClick={() => setErr(false)} message={messageErr} />
            }
            {openAdd &&
                <Modal onClick={() => setOpenAdd(false)}>
                    <Input placeholder="ФИО водителя" value={nameDriver} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameDriver(e.target.value)} />
                    <div style={{ marginBottom: '20px' }}></div>
                    <Button onClick={save}>Сохранить</Button>
                </Modal>
            }
            {openEdit &&
                <Modal onClick={() => setOpenEdit(false)}>
                    <Input placeholder="ФИО водителя" value={nameEditDriver} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameEditDriver(e.target.value)} />
                    <div style={{ marginBottom: '20px' }}></div>
                    <Button onClick={saveEdit}>Сохранить</Button>
                </Modal>
            }

            {success &&
                <Success onClick={() => setSuccess(false)} />
            }
        </>
    );
}

export default Drivers;