import React, { useState, useEffect }  from "react";
import { Outlet, Navigate } from "react-router-dom";

import CustomNavbar from "../common/nav-bar/CustomNavbar";
import { useFetchSingleProfileQuery } from "../../slicers/authSlice";

import './Routing.css';

const DriverRoute = () => {
    const [isAuth, setIsAuth] = useState(true);

    const { data: userData, isLoading: userIsLoading, error: userError } = useFetchSingleProfileQuery();

    useEffect(() => {
        if(!userData && !userIsLoading){
            setIsAuth(false)
        }
    }, [userData]);

    return isAuth ? <div className={'app-container'}>
        <CustomNavbar userType={userData?.userProfile?.userType} userId={userData?.userProfile?.id}/>
        <main className={'main-content'}><Outlet/></main>
    </div> : <Navigate to={'/login'}/>
}

export default DriverRoute;