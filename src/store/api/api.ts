import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRoutes } from '../../pages/Schedule/Schedule';

interface IGetRoutesParametrs {
    start_stop_id: number,
    end_stop_id: number,
    date: string
}

export const api = createApi({
    reducerPath: 'api', // Уникальный ключ для идентификации этого среза состояния
    baseQuery: fetchBaseQuery({ baseUrl: '/' }), // Базовый URL для всех запросов
    endpoints: (builder) => ({
        getRoutes: builder.query<IRoutes[], IGetRoutesParametrs>({
            query: ({ start_stop_id, end_stop_id, date }) => {
                return `routes?start_stop_id=${start_stop_id}&end_stop_id=${end_stop_id}&date=${date}`;
            },
        })

    }),
});

// Экспортируем хуки для использования в компонентах
export const { useLazyGetRoutesQuery } = api;
