import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRoutes } from '../../pages/Schedule/Schedule';

interface IGetRoutesParametrs {
    start_stop_name: string,
    end_stop_name: string,
    date: string
}

interface IAddTicketParams {
    stop_from_id: number;
    stop_to_id: number;
    price: number;
    purchase_date: string;
    baggage: boolean;
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    endpoints: (builder) => ({
        getRoutes: builder.query<IRoutes[], IGetRoutesParametrs>({
            query: (params) => ({
                url: `routes/`,
                params: params
            }),
        }),
        addTicket: builder.mutation<void, IAddTicketParams>({
            query: (ticket) => ({
                url: 'addTicket',
                method: 'POST',
                body: ticket, // передача тела запроса с данными билета
            }),
        }),
    }),
});

export const { useLazyGetRoutesQuery, useAddTicketMutation } = api;
