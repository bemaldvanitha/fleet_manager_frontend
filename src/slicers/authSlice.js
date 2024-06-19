import { AUTH_URL } from "../configuration";
import { apiSlice } from "./apiSlice";

const getToken = () => localStorage.getItem('token')

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/Login`,
                body: data,
                method: 'POST',
            }),
            transformResponse: (response) => {
                const { token } = response;
                if(token){
                    localStorage.setItem('token', token);
                }
                return response;
            }
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/Register`,
                body: data,
                method: 'POST'
            })
        }),
        fetchSingleProfile: builder.query({
            query: () => ({
                url: `${AUTH_URL}/Profile`,
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }),
            keepUnusedDataFor: 5
        })
    })
});

export const { useLoginMutation, useRegisterMutation, useFetchSingleProfileQuery } = authApiSlice