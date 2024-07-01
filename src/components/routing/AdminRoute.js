import React, { useState, useEffect }  from "react";
import { Outlet, Navigate } from "react-router-dom";

import CustomNavbar from "../common/nav-bar/CustomNavbar";
import { useFetchSingleProfileQuery } from "../../slicers/authSlice";

import './Routing.css';

const AdminRoute = () => {
    const [isAdmin, setIsAdmin] = useState(true);

    const { data: userData, isLoading: userIsLoading, error: userError } = useFetchSingleProfileQuery();

    useEffect(() => {
        if(userData && userData?.userProfile?.userType !== 'Admin'){
            setIsAdmin(false)
        }
    }, [userData]);

    return isAdmin ? <div className={'app-container'}>
        <CustomNavbar userType={userData?.userProfile?.userType}/>
        <main className={'main-content'}><Outlet/></main>
    </div> : <Navigate to={'/login'}/>
}

export default AdminRoute;