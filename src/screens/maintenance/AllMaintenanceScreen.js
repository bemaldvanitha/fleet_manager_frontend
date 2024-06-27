import React, { useState, useEffect } from 'react';
import { ColorRing } from "react-loader-spinner";

import MaintenanceTable from "../../components/maintenance/MaintenanceTable";
import { useFetchAllMaintenanceQuery } from "../../slicers/maintenanceSlice";

import './AllMaintenanceScreen.css';

const AllMaintenanceScreen = () => {
    const [allMaintenances, setAllMaintenances] = useState([]);

    const { data: maintenanceData, isLoading: allMaintenanceIsLoading, error: allMaintenancesError } = useFetchAllMaintenanceQuery();

    useEffect(() => {
        if(maintenanceData && maintenanceData?.maintenances){
            setAllMaintenances(maintenanceData?.maintenances);
        }
    }, [maintenanceData]);

    if(allMaintenanceIsLoading){
        return (
            <div className={'loading-container'}>
                <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}}
                           wrapperClass="color-ring-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
            </div>
        )
    }
    return(
        <div className={'all-maintenance-screen'}>
            <p className={'all-maintenance-screen-title'}>All Maintenances</p>
            <div className={'divider'}></div>
            <div className={'all-maintenance-screen-container'}>
                <MaintenanceTable maintenances={allMaintenances}/>
            </div>
        </div>
    )
}

export default AllMaintenanceScreen;