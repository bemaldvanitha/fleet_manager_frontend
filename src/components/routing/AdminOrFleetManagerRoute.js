import React, { useState, useEffect }  from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useFetchSingleProfileQuery } from "../../slicers/authSlice";

const AdminOrFleetManagerRoute = () => {
    const [isAdminOrFleetManager, setIsAdminOrFleetManager] = useState(true);

    const { data: userData, isLoading: userIsLoading, error: userError } = useFetchSingleProfileQuery();

    useEffect(() => {
        if(userData && userData?.userProfile?.userType === 'Driver'){
            setIsAdminOrFleetManager(false)
        }
    }, [userData]);

    return isAdminOrFleetManager ? <div>
        <main><Outlet/></main>
    </div> : <Navigate to={'/login'}/>
}

export default AdminOrFleetManagerRoute;