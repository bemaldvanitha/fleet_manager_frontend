import { apiSlice } from "./apiSlice";
import { FUEL_URL } from "../configuration";

const getToken = () => localStorage.getItem('token');

export const fuelSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        saveFuelLevel: builder.mutation({
            query: (data) => ({
                url: `${FUEL_URL}/Level`,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                },
                body: data
            })
        }),
        fetchLatestFuelLevelToVehicle: builder.query({
            query: (id) => ({
                url: `${FUEL_URL}/Level/${id}`,
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                },
            }),
            keepUnusedDataFor: 5
        }),
        saveFuelRefill: builder.mutation({
            query: (data) => ({
                url: `${FUEL_URL}/Refill`,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                },
                body: data
            })
        }),
        fetchRefillToVehicle: builder.query({
            query: (id) => ({
                url: `${FUEL_URL}/Refill/${id}`,
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                },
            }),
            keepUnusedDataFor: 5
        }),
        fetchAllFuelRefills: builder.query({
            query: () => ({
                url: `${FUEL_URL}/Refill`,
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                },
            }),
            keepUnusedDataFor: 5
        })
    })
});

export const { useSaveFuelLevelMutation, useFetchLatestFuelLevelToVehicleQuery, useSaveFuelRefillMutation,
    useFetchRefillToVehicleQuery, useFetchAllFuelRefillsQuery } = fuelSlice;