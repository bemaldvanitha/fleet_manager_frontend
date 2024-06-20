import { apiSlice } from "./apiSlice";
import { DRIVER_URL } from "../configuration";

const getToken = () => localStorage.getItem('token')

export const driverSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        allDrivers: builder.query({
            query: () => ({
                url: DRIVER_URL,
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }),
            keepUnusedDataFor: 5
        }),
        createDriver: builder.mutation({
            query: (data) => ({
                url: `${DRIVER_URL}/Create`,
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                },
                body: data,
                method: 'POST',
            })
        }),
        getSingleDriver: builder.query({
            query: (id) => ({
                url: `${DRIVER_URL}/${id}`,
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }),
            keepUnusedDataFor: 5
        }),
        changeDriverStatus: builder.mutation({
            query: (id) => ({
                url: `${DRIVER_URL}/Status/${id}`,
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            })
        }),
        updateDriver: builder.mutation({
            query: (data) => ({
                url: `${DRIVER_URL}/Update/${data?.driverId}`,
                method: 'PATCH',
                body: data,
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            })
        }),
        deleteDriver: builder.mutation({
            query: (id) => ({
                url: `${DRIVER_URL}/Delete/${id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            })
        }),
        fetchAvailableDrivers: builder.query({
            query: () => ({
                url: `${DRIVER_URL}/Available`,
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }),
            keepUnusedDataFor: 5
        })
    })
});

export const { useAllDriversQuery, useCreateDriverMutation, useGetSingleDriverQuery, useChangeDriverStatusMutation,
    useUpdateDriverMutation, useDeleteDriverMutation, useFetchAvailableDriversQuery } = driverSlice;