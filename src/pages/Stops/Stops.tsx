import { FC, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useAddStopMutation, useDeleteStopMutation, useLazyGetStopsQuery, useUpdateStopMutation } from "../../store/api/api";
import Loading from "../../components/Loading/Loading";
import Error from "../Error/Error";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Success from "../../components/Success/Success";

interface StopsProps {

}

const Stops: FC<StopsProps> = () => {
    const [getStops, { data: stopsData, error, isLoading: isLoadingStops }] = useLazyGetStopsQuery();
    const [addStop] = useAddStopMutation();
    const [updateStop] = useUpdateStopMutation();
    const [deleteStop] = useDeleteStopMutation();

    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [id, setId] = useState<number>();

    const [nameStop, setNameStop] = useState<string>('');
    const [nameEditStop, setNameEditStop] = useState<string>('');

    const [err, setErr] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const [messageErr, setMessageErr] = useState<string>('');

   useEffect(() => {
        try {
            getStops();
        } catch (error) {
            console.error("Ошибка при получении остановки:", error);
            setMessageErr('Ошибка при получении остановки.');
            setErr(true);
        }
    }, [])

    const save = () => {
        if (nameStop !== '') {
            try {
                addStop({ name: nameStop }).unwrap();

                setSuccess(true);
                setNameStop('');

                getStops();
            } catch (error) {
                console.error("Ошибка при добавлении остановки:", error);
                setMessageErr('Ошибка при добавлении остановки.');
                setErr(true);
            }
        } else {
            setMessageErr('Кажется, вы забыли заполнить назавание остановки!');
            setErr(true);
        }
    };

    const saveEdit = () => {
        if (nameEditStop !== '' && id) {
            try {
                updateStop({id_stop: id, name: nameEditStop}).unwrap();

                setSuccess(true);
                setNameEditStop('');

                getStops();
            } catch (error) {
                console.error("Ошибка при изменении остановки:", error);
                setMessageErr('Ошибка при изменении остановки.');
                setErr(true);
            }
        } else {
            setMessageErr('Кажется, вы забыли заполнить назавание остановки!');
            setErr(true);
        }
    }

    const handleDelete = (id: number) => {
        if (id) {
            try {
                deleteStop({id_stop: id}).unwrap();

                setSuccess(true);
                getStops();
            } catch (error) {
                console.error("Ошибка при удалении остановки:", error);
                setMessageErr('Ошибка при удалении остановки.');
                setErr(true);
            }
        } 
    }

    return (
        <>
            <Header />
            <div className='btn-add'>
                <Button onClick={() => setOpenAdd(true)}>Добавить остановку</Button>
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
                    {stopsData?.length ? (
                        stopsData.map((r) => (
                            <tr key={r.id_stop}>
                                <td>{r.name}</td>
                                <td className="table-btn">
                                    <button className='btn' onClick={() => { setId(r.id_stop); setNameEditStop(r.name); setOpenEdit(true) }}>
                                        <img src="/edit.png" alt="Кнопка редактировать" />
                                    </button>
                                </td>
                                <td className="table-btn">
                                    <button className='btn' onClick={() => handleDelete(r.id_stop)}>
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
            {(isLoadingStops) &&
                <Loading />
            }
            {err &&
                <Error onClick={() => setErr(false)} message={messageErr} />
            }
            {openAdd &&
                <Modal onClick={() => setOpenAdd(false)}>
                    <Input placeholder="Название остановки" value={nameStop} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameStop(e.target.value)} />
                    <div style={{ marginBottom: '20px' }}></div>
                    <Button onClick={save}>Сохранить</Button>
                </Modal>
            }
            {openEdit &&
                <Modal onClick={() => setOpenEdit(false)}>
                    <Input placeholder="Название остановки" value={nameEditStop} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameEditStop(e.target.value)} />
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

export default Stops;