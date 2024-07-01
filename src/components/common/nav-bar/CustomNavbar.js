import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Tooltip, Image } from "antd";

import './CustomNavbar.css';

import tripSelect from '../../../assets/images/logo/trip-select.svg';
import tripNotSelect from '../../../assets/images/logo/trip-not-select.svg';
import fuelSelect from '../../../assets/images/logo/fuel-select.svg';
import fuelNotSelect from '../../../assets/images/logo/fuel-not-select.svg';
import maintenanceSelect from '../../../assets/images/logo/maintenance-select.svg';
import maintenanceNotSelect from '../../../assets/images/logo/maintenance-not-select.svg';
import logout from '../../../assets/images/logo/logout.svg';

const CustomNavbar = ({ userType }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const [selectedMenuItem, setSelectedMenuItem] = useState(0);

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
        }
    }, []);

    const handleMenuItemClick = (itemIdx) => {
        setSelectedMenuItem(itemIdx);
        if(itemIdx === 0){
            navigate('/trips');
        }else if(itemIdx === 1){
            navigate('/fuel');
        }else if(itemIdx === 2){
            navigate('/maintenance');
        }
    }

    const logoutHandler = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className={`nav-bar`}>
            <div className={'nav-bar-slider'}>
                <div className={`menu-item ${selectedMenuItem === 0 ? 'selected-menu-item' : 'not-selected-menu-item'}`}
                     onClick={() => handleMenuItemClick(0)}>
                    <Tooltip title={'Trips'} placement={'right'}>
                        {selectedMenuItem === 0 ?
                            <Image src={tripSelect} className={'menu-icon-select'} preview={false}/> :
                            <Image src={tripNotSelect} className={'menu-icon'} preview={false}/>}
                    </Tooltip>
                </div>
                <div className={`menu-item ${selectedMenuItem === 1 ? 'selected-menu-item' : 'not-selected-menu-item'}`}
                     onClick={() => handleMenuItemClick(1)}>
                    <Tooltip title={'Fuel'} placement={'right'}>
                        {selectedMenuItem === 1 ?
                            <Image src={fuelSelect} className={'menu-icon-select'} preview={false}/> :
                            <Image src={fuelNotSelect} className={'menu-icon'} preview={false}/>}
                    </Tooltip>
                </div>
                <div className={`menu-item ${selectedMenuItem === 2 ? 'selected-menu-item' : 'not-selected-menu-item'}`}
                     onClick={() => handleMenuItemClick(2)}>
                    <Tooltip title={'Maintenances'} placement={'right'}>
                        {selectedMenuItem === 2 ?
                            <Image src={maintenanceSelect} className={'menu-icon-select'} preview={false}/> :
                            <Image src={maintenanceNotSelect} className={'menu-icon'} preview={false}/>}
                    </Tooltip>
                </div>
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