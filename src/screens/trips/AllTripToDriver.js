import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";

import CustomButton from "../../components/common/CustomButton";
import TripsTable from "../../components/trips/TripsTable";
import { useFetchTripsToDriverQuery} from "../../slicers/tripSlice";

import './AllTripsScreen.css';

const AllTripToDriver = () => {
    const navigate = useNavigate();
    const driverId = useParams().id;

    const [allTrips, setAllTrips] = useState([]);

    const { data: tripsData, isLoading: allTripsIsLoading, error: allTripsError } = useFetchTripsToDriverQuery(driverId);

    useEffect(() => {
        if(tripsData && tripsData?.trips){
            setAllTrips(tripsData?.trips)
        }
    }, [tripsData]);

    if(allTripsIsLoading){

    }else {
        return (
            <div className={'trips-screen'}>
                <p className={'trips-screen-title'}>All Trips</p>
                <div className={'divider'}></div>
                <div className={'trips-screen-table-container'}>
                    <TripsTable trips={allTrips} cancelTrip={() => {}} userType={'Driver'}/>
                </div>
            </div>
        )
    }
}

export default AllTripToDriver;