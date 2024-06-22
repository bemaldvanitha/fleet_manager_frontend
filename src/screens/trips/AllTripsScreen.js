import React, { useState, useEffect } from 'react';
import { ColorRing } from "react-loader-spinner";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import CustomButton from "../../components/common/CustomButton";
import TripsTable from "../../components/trips/TripsTable";
import { useFetchAllTripsQuery, useCancelPendingTripMutation } from "../../slicers/tripSlice";

import './AllTripsScreen.css';

const AllTripsScreen = () => {
    const navigate = useNavigate();
    const [allTrips, setAllTrips] = useState([]);

    const { data: tripsData, isLoading: allTripsIsLoading, refetch, error: allTripsError } = useFetchAllTripsQuery();
    const [cancelPendingTrip, { isLoading: cancelPendingTripIsLoading }] = useCancelPendingTripMutation();

    useEffect(() => {
        if(tripsData && tripsData?.trips){
            setAllTrips(tripsData?.trips)
        }
    }, [tripsData]);

    const addTripHandler = () => {
        navigate('/trips/create');
    }

    const cancelPendingTripHandler = async (id) => {
        try {
            const res = await cancelPendingTrip(id);
            message.success(res?.message);
            await refetch();
        }catch (error){
            console.log(error);
            message.error(error?.data?.message)
        }
    }

    if(allTripsIsLoading || cancelPendingTripIsLoading){
        return (
            <div className={'loading-container'}>
                <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}}
                           wrapperClass="color-ring-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
            </div>
        )
    }else {
        return(
            <div className={'trips-screen'}>
                <p className={'trips-screen-title'}>All Trips</p>
                <div className={'divider'}></div>
                <div className={'trips-screen-button-container'}>
                    <CustomButton title={'Add Trip'} bgColor={'transparent'} fontColor={'#f0f0f0'} onClick={addTripHandler}/>
                </div>
                <div className={'trips-screen-table-container'}>
                    <TripsTable trips={allTrips} cancelTrip={cancelPendingTripHandler}/>
                </div>
            </div>
        )
    }
}

export default AllTripsScreen;