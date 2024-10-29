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

interface IRoutesStops {
    id_route: number,
    route_name: string,
    bus_number: string,
    standard_price: number,
    stops_list: string
}
interface IStop {
    stop_id: number,
    stop_order: number,
    additional_price: number,
    departure: string,
    arrival: string
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
        //получение остановок
        getStops: builder.query<{ id_stop: number, name: string }[], void>({
            query: () => 'stops'
        }),
        //добавление остановки
        addStop: builder.mutation<void, { name: string }>({
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
        //получение автобусов
        getBuses: builder.query<{ id_bus: number; bus_number: string; capacity: number; driver_id: number, driver_name: string }[], void>({
            query: () => 'buses'
        }),
        //добавление автобуса
        addBus: builder.mutation<void, { bus_number: string; capacity: number; driver_name: number }>({
            query: (bus) => ({
                url: 'addBus',
                method: 'POST',
                body: bus,
            }),
        }),
        //изменение автобуса
        updateBus: builder.mutation<void, { id_bus: number; bus_number: string; capacity: number; driver_name: number }>({
            query: (bus) => ({
                url: `updateBus/${bus.id_bus}`,
                method: 'PUT',
                body: { bus_number: bus.bus_number, capacity: bus.capacity, driver_name: bus.driver_name },
            }),
        }),
        //удаление автобуса
        deleteBus: builder.mutation<void, { id_bus: number }>({
            query: (bus) => ({
                url: `deleteBus/${bus.id_bus}`,
                method: 'DELETE',
            }),
        }),
        //получение билетов
        getRoutesStops: builder.query<IRoutesStops[], void>({
            query: () => 'routes-stops'
        }),
        // добавление маршрута
        addRoute: builder.mutation<void, { name: string, bus_id: number, standard_price: number }>({
            query: (route) => ({
                url: 'addRoute',
                method: 'POST',
                body: route,
            }),
        }),
        // добавление остановок на маршрут
        addRouteStops: builder.mutation<void, { route_id: number; stops: IStop[] }>({
            query: (route) => ({
                url: 'addRouteStops',
                method: 'POST',
                body: route,
            }),
        }),
        //удаление маршрута
        deleteRoutes: builder.mutation<void, { id_route: number }>({
            query: (route) => ({
                url: `deleteRoutes/${route.id_route}`,
                method: 'DELETE',
            }),
        }),
        //получение билетов
        getTickets: builder.query<ITickets[], void>({
            query: () => 'tickets'
        }),
    }),
});

export const { useLazyGetRoutesQuery, useAddTicketMutation, useLazyGetDriversQuery, useAddDriverMutation, useUpdateDriverMutation, useDeleteDriverMutation,
    useLazyGetStopsQuery, useAddStopMutation, useUpdateStopMutation, useDeleteStopMutation,
    useLazyGetBusesQuery, useAddBusMutation, useUpdateBusMutation, useDeleteBusMutation,
    useLazyGetRoutesStopsQuery, useAddRouteMutation, useAddRouteStopsMutation, useDeleteRoutesMutation,
    useLazyGetTicketsQuery } = api;
