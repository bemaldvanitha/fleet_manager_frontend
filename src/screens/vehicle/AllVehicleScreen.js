import React, { useEffect, useState } from 'react';
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import VehiclesTable from "../../components/vehicles/VehiclesTable";
import CustomButton from "../../components/common/CustomButton";
import SingleVehicleInfoModel from "../../components/vehicles/SingleVehicleInfoModel";
import { useFetchAllVehiclesQuery, useChangeVehicleAvailabilityMutation, useRemoveVehicleMutation, useFetchSingleVehicleQuery,
    useFetchVehicleCurrentLocationQuery } from "../../slicers/vehicleSlice";
import { useFetchLatestFuelLevelToVehicleQuery, useFetchRefillToVehicleQuery } from "../../slicers/fuelSlice";
import { useFetchMaintenanceToVehicleQuery } from "../../slicers/maintenanceSlice";

import './AllVehicleScreen.css';

const AllVehicleScreen = () => {
    const navigate = useNavigate();
    const [allVehicles, setAllVehicles] = useState();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [selectedVehicleId, setSelectedVehicleId] = useState('');
    const [selectedVehicleData, setSelectedVehicleData] = useState({});
    const [selectedVehicleLocation, setSelectedVehicleLocation] = useState({});
    const [selectedVehicleFuelLevels, setSelectedVehicleFuelLevels] = useState([]);
    const [selectedVehicleFuelRefills, setSelectedVehicleFuelRefills] = useState([]);
    const [selectedVehicleMaintenances, setSelectedVehicleMaintenances] = useState([]);

    const { data: allVehicleData, isLoading: allVehicleIsLoading, refetch, error: allVehicleError } = useFetchAllVehiclesQuery();
    const [changeVehicleAvailability, { isLoading: changeAvailabilityIsLoading }] = useChangeVehicleAvailabilityMutation();
    const [removeVehicle, { isLoading: removeVehicleIsLoading }] = useRemoveVehicleMutation();
    const { data: singleVehicleData, isLoading: singleVehicleIsLoading, error: singleVehicleError } =
        useFetchSingleVehicleQuery(selectedVehicleId);
    const { data: vehicleLocationData, isLoading: vehicleLocationIsLoading, error: vehicleLocationError } =
        useFetchVehicleCurrentLocationQuery(selectedVehicleId);
    const { data: vehicleFuelLevelData, isLoading: vehicleFuelLevelIsLoading, error: vehicleFuelLevelError } =
        useFetchLatestFuelLevelToVehicleQuery(selectedVehicleId);
    const { data: vehicleFuelRefillData, isLoading: vehicleFuelRefillIsLoading, error: vehicleFuelRefillError } =
        useFetchRefillToVehicleQuery(selectedVehicleId);
    const { data: vehicleMaintenanceData, isLoading: vehicleMaintenanceIsLoading, error: vehicleMaintenanceError } =
        useFetchMaintenanceToVehicleQuery(selectedVehicleId);

    useEffect(() => {
        if(allVehicleData && allVehicleData?.vehicles){
            setAllVehicles(allVehicleData?.vehicles);
        }
    }, [allVehicleData]);

    useEffect(() => {
        if(vehicleLocationData && vehicleLocationData?.lastLocation){
            setSelectedVehicleLocation(vehicleLocationData?.lastLocation)
        }
    }, [vehicleLocationData]);

    useEffect(() => {
        if(vehicleFuelLevelData && vehicleFuelLevelData?.fuelLevel){
            setSelectedVehicleFuelLevels(vehicleFuelLevelData?.fuelLevel);
        }
    }, [vehicleFuelLevelData]);

    useEffect(() => {
        if(vehicleFuelRefillData && vehicleFuelRefillData?.fuelRefills){
            setSelectedVehicleFuelRefills(vehicleFuelRefillData?.fuelRefills)
        }
    }, [vehicleFuelRefillData]);

    useEffect(() => {
        if(singleVehicleData && singleVehicleData?.vehicle){
            setSelectedVehicleData(singleVehicleData?.vehicle)
        }
    }, [singleVehicleData]);

    useEffect(() => {
        if(vehicleMaintenanceData && vehicleMaintenanceData?.maintenances){
            setSelectedVehicleMaintenances(vehicleMaintenanceData?.maintenances);
        }
    }, [vehicleMaintenanceData]);

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

    const singleVehicleModelOpenHandler = (id) => {
        setIsModelOpen(true);
        setSelectedVehicleId(id);
    }

    const cancelSingleVehicleModel = () => {
        setIsModelOpen(false);
        setSelectedVehicleId('');
        setSelectedVehicleData({});
    }

    if(allVehicleIsLoading || changeAvailabilityIsLoading || removeVehicleIsLoading || singleVehicleIsLoading ||
        vehicleLocationIsLoading || vehicleFuelLevelIsLoading || vehicleFuelRefillIsLoading || vehicleMaintenanceIsLoading){
        return (
            <div className={'loading-container'}>
                <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}}
                           wrapperClass="color-ring-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
            </div>
        )
    }else {
        return(
            <div className={'vehicle-screen'}>
                {isModelOpen && <SingleVehicleInfoModel closeModel={cancelSingleVehicleModel} visibility={isModelOpen}
                            data={selectedVehicleData} location={selectedVehicleLocation} fuelRefills={selectedVehicleFuelRefills}
                                                        fuelLevels={selectedVehicleFuelLevels}
                                                        vehicleMaintenances={selectedVehicleMaintenances}/>}
                <p className={'vehicle-screen-title'}>All Vehicles</p>
                <div className={'divider'}></div>
                <div className={'vehicle-table-button-container'}>
                    <CustomButton title={'Add Vehicle'} bgColor={'transparent'} fontColor={'#f0f0f0'}
                                  onClick={createVehicleNavigateHandler}/>
                </div>
                <div className={'vehicle-screen-table-container'}>
                    <VehiclesTable vehicles={allVehicles} changeAvailability={changeAvailabilityHandler}
                                   removeVehicle={removeVehicleHandler} openSingleVehicle={singleVehicleModelOpenHandler}/>
                </div>
            </div>
        )
    }
}

export default AllVehicleScreen;