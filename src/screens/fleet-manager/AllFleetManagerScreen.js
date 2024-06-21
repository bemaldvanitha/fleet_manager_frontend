import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

import CustomButton from "../../components/common/CustomButton";
import FleetManagerTable from "../../components/fleet-manager/FleetManagerTable";
import { useFetchAllFleetManagersQuery } from "../../slicers/userSlice";

import './AllFleetManagerScreen.css';

const AllFleetManagerScreen = () => {
    const navigate = useNavigate();

    const [fleetManagers, setFleetManagers] = useState([]);

    const { data: fleetManagerData, isLoading: fetchFleetManagerIsLoading, error: fetchFleetManagerError } =
        useFetchAllFleetManagersQuery();

    useEffect(() => {
        if(fleetManagerData && fleetManagerData?.fleetManagers){
            setFleetManagers(fleetManagerData?.fleetManagers);
        }
    }, [fleetManagerData]);

    const addFleetManagerHandler = () => {
        navigate('/fleet-managers/create');
    }

    if(fetchFleetManagerIsLoading){
        return (
            <div className={'loading-container'}>
                <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}}
                           wrapperClass="color-ring-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
            </div>
        )
    }else {
        return(
            <div className={'fleet-manager-screen'}>
                <p className={'fleet-manager-screen-title'}>Fleet Managers</p>
                <div className={'divider'}></div>
                <div className={'fleet-manager-screen-button-container'}>
                    <CustomButton title={'Add Fleet Manager'} bgColor={'transparent'} fontColor={'#f0f0f0'}
                                  onClick={addFleetManagerHandler}/>
                </div>
                <div className={'fleet-manager-screen-table-container'}>
                    <FleetManagerTable fleetManagers={fleetManagers}/>
                </div>
            </div>
        )
    }
}

export default AllFleetManagerScreen;