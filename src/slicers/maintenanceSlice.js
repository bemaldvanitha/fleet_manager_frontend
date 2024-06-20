import { apiSlice } from "./apiSlice";
import { MAINTENANCE_URL } from "../configuration";

const getToken = () => localStorage.getItem('token')

export const maintenanceSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
       vehicleMaintenanceAdd: builder.mutation({
           query: (data) => ({
               url: `${MAINTENANCE_URL}/Add`,
               method: 'POST',
               headers: {
                   'Authorization': `Bearer ${getToken()}`
               },
               body: data
           })
       }),
       fetchMaintenanceToVehicle: builder.query({
           query: (id) => ({
               url: `${MAINTENANCE_URL}/${id}`,
               headers: {
                   'Authorization': `Bearer ${getToken()}`
               },
           }),
           keepUnusedDataFor: 5
       }),
       fetchAllMaintenance: builder.query({
           query: () => ({
               url: MAINTENANCE_URL,
               headers: {
                   'Authorization': `Bearer ${getToken()}`
               },
           }),
           keepUnusedDataFor: 5
       })
   })
});

export const { useVehicleMaintenanceAddMutation, useFetchMaintenanceToVehicleQuery, useFetchAllMaintenanceQuery } = maintenanceSlice;