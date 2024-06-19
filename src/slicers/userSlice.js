import { USER_URL } from "../configuration";
import { apiSlice } from "./apiSlice";

const getToken = () => localStorage.getItem('token')

export const userSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchAllDrivers: builder.query({
            query: () => ({
                url: `${USER_URL}/Drivers`,
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }),
            keepUnusedDataFor: 5
        }),
    })
});

export const { useFetchAllDriversQuery } = userSlice;