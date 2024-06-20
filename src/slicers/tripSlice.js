import { apiSlice } from "./apiSlice";
import { TRIP_URL } from "../configuration";

const getToken = () => localStorage.getItem('token');

const tripSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
       createTrip: builder.mutation({
           query: (data) => ({
               url: `${TRIP_URL}/Create`,
               method: 'POST',
               headers: {
                   'Authorization': `Bearer ${getToken()}`
               },
               body: data
           })
       }),
       startTrip: builder.mutation({
           query: (id) => ({
               url: `${TRIP_URL}/Start/${id}`,
               method: 'PATCH',
               headers: {
                   'Authorization': `Bearer ${getToken()}`
               },
           })
       }),
       saveTripLocation: builder.mutation({
           query: (id, data) => ({
               url: `${TRIP_URL}/Location/${id}`,
               method: 'PATCH',
               headers: {
                   'Authorization': `Bearer ${getToken()}`
               },
               body: data
           })
       }),
       tripStopStart: builder.mutation({
           query: (id, data) => ({
               url: `${TRIP_URL}/Stop/Start/${id}`,
               method: 'PATCH',
               body: data,
               headers: {
                   'Authorization': `Bearer ${getToken()}`
               },
           })
       }),
       tripStopEnd: builder.mutation({
           query: (id) => ({
               url: `${TRIP_URL}/Stop/End/${id}`,
               method: 'PATCH',
               headers: {
                   'Authorization': `Bearer ${getToken()}`
               },
           })
       }),
       tripEnd: builder.mutation({
           query: (id) => ({
               url: `${TRIP_URL}/End/${id}`,
               method: 'PATCH',
               headers: {
                   'Authorization': `Bearer ${getToken()}`
               },
           })
       }),
       fetchAllTrips: builder.query({
           query: () => ({
               url: TRIP_URL,
               headers: {
                   'Authorization': `Bearer ${getToken()}`
               },
           }),
           keepUnusedDataFor: 5
       }),
       fetchTripsToDriver: builder.query({
           query: (id) => ({
               url: `${TRIP_URL}/Driver/${id}`,
               headers: {
                   'Authorization': `Bearer ${getToken()}`
               },
           }),
           keepUnusedDataFor: 5
       }),
       fetchTripsFromVehicle: builder.query({
           query: (id) => ({
               url: `${TRIP_URL}/Vehicle/${id}`,
               headers: {
                   'Authorization': `Bearer ${getToken()}`
               },
           }),
           keepUnusedDataFor: 5
       }),
       fetchSingleTrip: builder.query({
           query: (id) => ({
               url: `${TRIP_URL}/${id}`,
               headers: {
                   'Authorization': `Bearer ${getToken()}`
               },
           }),
           keepUnusedDataFor: 5
       }),
       cancelPendingTrip: builder.mutation({
           query: (id) => ({
               url: `${TRIP_URL}/${id}`,
               method: 'DELETE',
               headers: {
                   'Authorization': `Bearer ${getToken()}`
               },
           })
       }),
   })
});

export const { useCreateTripMutation, useStartTripMutation, useSaveTripLocationMutation, useTripStopStartMutation,
    useTripStopEndMutation, useTripEndMutation, useFetchAllTripsQuery, useFetchTripsToDriverQuery,
    useFetchTripsFromVehicleQuery, useFetchSingleTripQuery, useCancelPendingTripMutation } = tripSlice;