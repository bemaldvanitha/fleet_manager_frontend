import React, { useState, useEffect } from 'react';
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import { useFetchAllDriversQuery } from "../../slicers/userSlice";
import DriversTable from "../../components/drivers/DriversTable";
import CustomButton from "../../components/common/CustomButton";

import './AllDriversScreen.css';

const AllDriversScreen = () => {
    const navigate = useNavigate();
    const [drivers, setDrivers] = useState([]);

    const { data: driverData, isLoading: driverIsLoading, error: driverError } = useFetchAllDriversQuery();

    useEffect(() => {
        if(driverData && driverData?.drivers){
            setDrivers(driverData?.drivers);
        }
    }, [driverData]);

    const addDriversHandler = () => {
        navigate('/drivers/create');
    }

    if(driverIsLoading){
        return (
            <div className={'loading-container'}>
                <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}}
                           wrapperClass="color-ring-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
            </div>
        )
    }else {
        return(
            <div className={'drivers-screen'}>
                <p className={'drivers-screen-title'}>All Drivers</p>
                <div className={'divider'}></div>
                <div className={'drivers-table-button-container'}>
                    <CustomButton title={'Add Driver!'} bgColor={'transparent'} fontColor={'#f0f0f0'}
                                  onClick={addDriversHandler}/>
                </div>
                <div className={'drivers-screen-table-container'}>
                    <DriversTable drivers={drivers}/>
                </div>
            </div>
        )
    }
}

export default AllDriversScreen;