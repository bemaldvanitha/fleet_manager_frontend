import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Tooltip, Image } from "antd";

import { useFetchDriverIdToUserIdQuery } from "../../../slicers/driverSlice";

import './CustomNavbar.css';

import tripSelect from '../../../assets/images/logo/trip-select.svg';
import tripNotSelect from '../../../assets/images/logo/trip-not-select.svg';
import fuelSelect from '../../../assets/images/logo/fuel-select.svg';
import fuelNotSelect from '../../../assets/images/logo/fuel-not-select.svg';
import maintenanceSelect from '../../../assets/images/logo/maintenance-select.svg';
import maintenanceNotSelect from '../../../assets/images/logo/maintenance-not-select.svg';
import logout from '../../../assets/images/logo/logout.svg';
import driverSelect from '../../../assets/images/logo/driver-select.svg';
import driverNotSelect from '../../../assets/images/logo/driver-not-select.svg';
import vehicleSelect from '../../../assets/images/logo/vehicle-select.svg';
import vehicleNotSelect from '../../../assets/images/logo/vehicle-not-select.svg';
import managerSelect from '../../../assets/images/logo/manager-select.svg';
import managerNotSelect from '../../../assets/images/logo/manager-not-select.svg';

const CustomNavbar = ({ userType, userId = '' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const [selectedMenuItem, setSelectedMenuItem] = useState(0);

    const { data: driverData, isLoading: driverIsLoading, error: driverError } = useFetchDriverIdToUserIdQuery(userId);

    useEffect(() => {
        switch (currentPath){
            case '/trips':
                setSelectedMenuItem(0);
                break;
            case '/trips/create':
                setSelectedMenuItem(1);
                break;
            case '/fuel':
                setSelectedMenuItem(1);
                break;
            case '/maintenance':
                setSelectedMenuItem(2);
                break;
            case '/vehicles':
                setSelectedMenuItem(3);
                break;
            case '/vehicles/create':
                setSelectedMenuItem(3);
                break;
            case '/vehicles/edit/:id':
                setSelectedMenuItem(3);
                break;
            case '/drivers':
                setSelectedMenuItem(4);
                break;
            case '/drivers/create':
                setSelectedMenuItem(4);
                break;
            case '/drivers/edit/:id':
                setSelectedMenuItem(4);
                break;
            case '/drivers/:id':
                setSelectedMenuItem(4);
                break;
            case '/fleet-managers':
                setSelectedMenuItem(5);
                break;
            case '/fleet-managers/create':
                setSelectedMenuItem(5);
                break;
            case '/trips/:id':
                setSelectedMenuItem(6);
                break;
        }
    }, [currentPath]);

    const handleMenuItemClick = (itemIdx) => {
        setSelectedMenuItem(itemIdx);
        if(itemIdx === 0){
            navigate('/trips');
        }else if(itemIdx === 1){
            navigate('/fuel');
        }else if(itemIdx === 2){
            navigate('/maintenance');
        }else if(itemIdx === 3){
            navigate('/vehicles');
        }else if(itemIdx === 4){
            navigate('/drivers');
        }else if(itemIdx === 5){
            navigate('/fleet-managers');
        }else if(itemIdx === 6){
            navigate(`/trips/${driverData?.driverId}`);
        }
    }

    const logoutHandler = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className={`nav-bar`}>
            <div className={'nav-bar-slider'}>
                {userType !== 'Driver' && <div className={`menu-item ${selectedMenuItem === 0 ? 'selected-menu-item' : 
                    'not-selected-menu-item'}`}
                     onClick={() => handleMenuItemClick(0)}>
                    <Tooltip title={'Trips'} placement={'right'}>
                        {selectedMenuItem === 0 ?
                            <Image src={tripSelect} className={'menu-icon-select'} preview={false}/> :
                            <Image src={tripNotSelect} className={'menu-icon'} preview={false}/>}
                    </Tooltip>
                </div>}
                {userType !== 'Driver' && <div className={`menu-item ${selectedMenuItem === 1 ? 'selected-menu-item' : 
                    'not-selected-menu-item'}`}
                     onClick={() => handleMenuItemClick(1)}>
                    <Tooltip title={'Fuel'} placement={'right'}>
                        {selectedMenuItem === 1 ?
                            <Image src={fuelSelect} className={'menu-icon-select'} preview={false}/> :
                            <Image src={fuelNotSelect} className={'menu-icon'} preview={false}/>}
                    </Tooltip>
                </div>}
                {userType !== 'Driver' && <div className={`menu-item ${selectedMenuItem === 2 ? 'selected-menu-item' : 
                    'not-selected-menu-item'}`}
                     onClick={() => handleMenuItemClick(2)}>
                    <Tooltip title={'Maintenances'} placement={'right'}>
                        {selectedMenuItem === 2 ?
                            <Image src={maintenanceSelect} className={'menu-icon-select'} preview={false}/> :
                            <Image src={maintenanceNotSelect} className={'menu-icon'} preview={false}/>}
                    </Tooltip>
                </div>}
                {userType === 'Admin' && <div className={`menu-item ${selectedMenuItem === 3 ? 'selected-menu-item' : 
                    'not-selected-menu-item'}`} onClick={() => handleMenuItemClick(3)}>
                    <Tooltip title={'Vehicles'} placement={'right'}>
                        {selectedMenuItem === 3 ?
                            <Image src={vehicleSelect} className={'menu-icon-select'} preview={false}/> :
                            <Image src={vehicleNotSelect} className={'menu-icon'} preview={false}/>}
                    </Tooltip>
                </div>}

                {userType === 'Admin' && <div className={`menu-item ${selectedMenuItem === 4 ? 'selected-menu-item' :
                    'not-selected-menu-item'}`} onClick={() => handleMenuItemClick(4)}>
                    <Tooltip title={'Drivers'} placement={'right'}>
                        {selectedMenuItem === 4 ?
                            <Image src={driverSelect} className={'menu-icon-select'} preview={false}/> :
                            <Image src={driverNotSelect} className={'menu-icon'} preview={false}/>}
                    </Tooltip>
                </div>}

                {userType === 'Admin' && <div className={`menu-item ${selectedMenuItem === 5 ? 'selected-menu-item' :
                    'not-selected-menu-item'}`} onClick={() => handleMenuItemClick(5)}>
                    <Tooltip title={'Fleet Manager'} placement={'right'}>
                        {selectedMenuItem === 5 ?
                            <Image src={managerSelect} className={'menu-icon-select'} preview={false}/> :
                            <Image src={managerNotSelect} className={'menu-icon'} preview={false}/>}
                    </Tooltip>
                </div>}

                {userType === 'Driver' && <div className={`menu-item ${selectedMenuItem === 6 ? 'selected-menu-item' :
                    'not-selected-menu-item'}`} onClick={() => handleMenuItemClick(6)}>
                    <Tooltip title={'Trips'} placement={'right'}>
                        {selectedMenuItem === 6 ?
                            <Image src={tripSelect} className={'menu-icon-select'} preview={false}/> :
                            <Image src={tripNotSelect} className={'menu-icon'} preview={false}/>}
                    </Tooltip>
                </div>}

                <div className={`menu-item`} onClick={logoutHandler}>
                    <Tooltip title={'Logout'} placement={'right'}>
                        <Image src={logout} className={'menu-icon-select'} preview={false}/>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default CustomNavbar;