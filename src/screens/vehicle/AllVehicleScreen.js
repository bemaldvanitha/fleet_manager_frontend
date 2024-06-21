import React, { useEffect, useState } from 'react';
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import VehiclesTable from "../../components/vehicles/VehiclesTable";
import CustomButton from "../../components/common/CustomButton";
import { useFetchAllVehiclesQuery, useChangeVehicleAvailabilityMutation, useRemoveVehicleMutation } from "../../slicers/vehicleSlice";

import './AllVehicleScreen.css';

const AllVehicleScreen = () => {
    const navigate = useNavigate();
    const [allVehicles, setAllVehicles] = useState();

    const { data: allVehicleData, isLoading: allVehicleIsLoading, refetch, error: allVehicleError } = useFetchAllVehiclesQuery();
    const [changeVehicleAvailability, { isLoading: changeAvailabilityIsLoading }] = useChangeVehicleAvailabilityMutation();
    const [removeVehicle, { isLoading: removeVehicleIsLoading }] = useRemoveVehicleMutation();


    useEffect(() => {
        if(allVehicleData && allVehicleData?.vehicles){
            setAllVehicles(allVehicleData?.vehicles);
        }
    }, [allVehicleData]);

    const changeAvailabilityHandler = async (id) => {
        try{
            const res = await changeVehicleAvailability(id).unwrap();
            message.success(res?.message);
            await refetch()
        }catch (error){
            console.log(error);
            message.error(error?.data?.message)
        }
    }

    const removeVehicleHandler = async (id) => {
        try{
            const res = await removeVehicle(id).unwrap();
            message.success(res?.message);
            await refetch();
        }catch (error){
            console.log(error);
            message.error(error?.data?.message);
        }
    }

    const createVehicleNavigateHandler = () => {
        navigate('/vehicles/create');
    }

    if(allVehicleIsLoading || changeAvailabilityIsLoading || removeVehicleIsLoading){
        return (
            <div className={'loading-container'}>
                <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}}
                           wrapperClass="color-ring-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
            </div>
        )
    }else {
        return(
            <div className={'vehicle-screen'}>
                <p className={'vehicle-screen-title'}>All Drivers</p>
                <div className={'divider'}></div>
                <div className={'vehicle-table-button-container'}>
                    <CustomButton title={'Add Driver'} bgColor={'transparent'} fontColor={'#f0f0f0'}
                                  onClick={createVehicleNavigateHandler}/>
                </div>
                <div className={'vehicle-screen-table-container'}>
                    <VehiclesTable vehicles={allVehicles} changeAvailability={changeAvailabilityHandler}
                                   removeVehicle={removeVehicleHandler}/>
                </div>
            </div>
        )
    }
}

export default AllVehicleScreen;