import { AUTH_URL } from "../configuration";
import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/Login`,
                body: data,
                method: 'POST',
            })
        })
    })
});

export const { useLoginMutation } = authApiSlice