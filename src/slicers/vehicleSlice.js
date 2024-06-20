import { apiSlice } from "./apiSlice";
import { VEHICLE_URL } from "../configuration";

const getToken = () => localStorage.getItem('token')

const vehicleSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchAllVehicles: builder.query({
            query: () => ({
                url: `${VEHICLE_URL}/All`,
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }),
            keepUnusedDataFor: 5
        }),
        fetchSingleVehicle: builder.query({
            query: (id) => ({
                url: `${VEHICLE_URL}/${id}`,
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }),
            keepUnusedDataFor: 5
        }),
        addVehicle: builder.mutation({
            query: (data) => ({
                url: `${VEHICLE_URL}/Add`,
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                },
                method: 'POST',
                body: data
            })
        }),
        removeVehicle: builder.mutation({
            query: (id) => ({
                url: `${VEHICLE_URL}/Delete/${id}`,
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                },
            })
        }),
        changeVehicleAvailability: builder.mutation({
            query: (id) => ({
                url: `${VEHICLE_URL}/Status/${id}`,
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                },
            })
        }),
        updateVehicleCertification: builder.mutation({
            query: (id, data) => ({
                url: `${VEHICLE_URL}/${id}`,
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                },
                body: data
            })
        }),
        fetchAvailableVehicles: builder.query({
            query: () => ({
                url: `${VEHICLE_URL}/Available`,
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                },
            }),
            keepUnusedDataFor: 5
        })
    })
});

export const { useFetchAllVehiclesQuery, useFetchSingleVehicleQuery, useAddVehicleMutation, useRemoveVehicleMutation,
    useChangeVehicleAvailabilityMutation, useUpdateVehicleCertificationMutation, useFetchAvailableVehiclesQuery } = vehicleSlice;