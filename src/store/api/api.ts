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

interface IDrivers {
    id_driver: number
    name: string
}

interface IDriverName {
    name: string
}

interface ITickets {
    id_ticket: number
    id_route: number
    number_route: number
    start_stop_name: string
    departure: string
    end_stop_name: string
    arrival: string
    route_name: string
    price: number
    purchase_date: string
    baggage: boolean
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    endpoints: (builder) => ({
        //получение расписания
        getRoutes: builder.query<IRoutes[], IGetRoutesParametrs>({
            query: (params) => ({
                url: `routes/`,
                params: params
            }),
        }),
        //добавление билета
        addTicket: builder.mutation<void, IAddTicketParams>({
            query: (ticket) => ({
                url: 'addTicket',
                method: 'POST',
                body: ticket,
            }),
        }),
        //получение водителей
        getDrivers: builder.query<IDrivers[], void>({
            query: () => 'drivers'
        }),
        //добавление водетеля
        addDriver: builder.mutation<void, IDriverName>({
            query: (driver) => ({
                url: 'addDriver',
                method: 'POST',
                body: driver,
            }),
        }),
        //изменение водителя
        updateDriver: builder.mutation<void, { id_driver: number; name: string }>({
            query: (driver) => ({
                url: `updateDriver/${driver.id_driver}`,
                method: 'PUT',
                body: { name: driver.name },
            }),
        }),
        //удаление водителя
        deleteDriver: builder.mutation<void, { id_driver: number }>({
            query: (driver) => ({
                url: `deleteDriver/${driver.id_driver}`,
                method: 'DELETE',
            }),
        }),
         //добавление остановки
         addStop: builder.mutation<void, {name: string}>({
            query: (stop) => ({
                url: 'addStop',
                method: 'POST',
                body: stop,
            }),
        }),
        //изменение остановки
        updateStop: builder.mutation<void, { id_stop: number; name: string }>({
            query: (stop) => ({
                url: `updateStop/${stop.id_stop}`,
                method: 'PUT',
                body: { name: stop.name },
            }),
        }),
        //удаление остановки
        deleteStop: builder.mutation<void, { id_stop: number }>({
            query: (stop) => ({
                url: `deleteStop/${stop.id_stop}`,
                method: 'DELETE',
            }),
        }),
        //получение остановок
        getStops: builder.query<{id_stop: number, name: string}[], void>({
            query: () => 'stops'
        }),
        //получение билетов
        getTickets: builder.query<ITickets[], void>({
            query: () => 'tickets'
        }),
    }),
});

export const { useLazyGetRoutesQuery, useAddTicketMutation, useLazyGetDriversQuery, useAddDriverMutation, useUpdateDriverMutation, useDeleteDriverMutation,
    useLazyGetStopsQuery, useAddStopMutation, useUpdateStopMutation, useDeleteStopMutation,
    useLazyGetTicketsQuery } = api;
