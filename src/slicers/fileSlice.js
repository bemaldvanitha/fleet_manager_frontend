import { apiSlice } from "./apiSlice";
import { FILE_URL } from "../configuration";

const getToken = () => localStorage.getItem('token')

export const fileSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        generatePresignedUrl: builder.mutation({
            query: (data) => ({
                url: `${FILE_URL}/Generate`,
                body: data,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            })
        })
    })
});

export const { useGeneratePresignedUrlMutation } = fileSlice;