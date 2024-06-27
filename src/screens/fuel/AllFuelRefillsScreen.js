import React, { useEffect, useState } from 'react';
import { ColorRing } from "react-loader-spinner";

import FuelRefillsTable from "../../components/fuel/FuelRefillsTable";
import { useFetchAllFuelRefillsQuery } from "../../slicers/fuelSlice";

import './AllFuelRefillsScreen.css';

const AllFuelRefillsScreen = () => {
    const [fuelRefills, setFuelRefills] = useState([]);

    const { data: fuelRefillsData, isLoading: fuelRefillsIsLoading, error: fuelRefillsError } = useFetchAllFuelRefillsQuery();

    useEffect(() => {
        if(fuelRefillsData && fuelRefillsData?.fuelRefills){
            setFuelRefills(fuelRefillsData?.fuelRefills);
        }
    }, [fuelRefillsData]);

    if(fuelRefillsIsLoading){
        return (
            <div className={'loading-container'}>
                <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}}
                           wrapperClass="color-ring-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
            </div>
        )
    }else {
        return(
            <div className={'all-fuel-refills-screen'}>
                <p className={'all-fuel-refills-screen-title'}>All Trips</p>
                <div className={'divider'}></div>
                <div className={'all-fuel-refills-screen-table-container'}>
                    <FuelRefillsTable fuelRefills={fuelRefills}/>
                </div>
            </div>
        )
    }
}

export default AllFuelRefillsScreen;