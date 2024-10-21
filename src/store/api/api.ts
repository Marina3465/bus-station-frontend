import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRoutes } from '../../pages/Schedule/Schedule';

interface IGetRoutesParametrs {
    start_stop_name: string,
    end_stop_name: string,
    date: string
}

export const api = createApi({
    reducerPath: 'api', // Уникальный ключ для идентификации этого среза состояния
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }), // Базовый URL для всех запросов
    endpoints: (builder) => ({
        getRoutes: builder.query<IRoutes[], IGetRoutesParametrs>({
            query: (params) => ({
                url: `routes/`,
                params: params
            }),
        }),
        // getStopId: builder.query<number, string>({
        //     query: (params) => ({
        //         url: `stop/`,
        //         params: params
        //     }),
        // })

    }),
});

// Экспортируем хуки для использования в компонентах
export const { useLazyGetRoutesQuery } = api;
