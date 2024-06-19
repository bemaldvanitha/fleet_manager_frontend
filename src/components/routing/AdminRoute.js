import React, { useState, useEffect }  from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useFetchSingleProfileQuery } from "../../slicers/authSlice";

const AdminRoute = () => {
    const [isAdmin, setIsAdmin] = useState(true);

    const { data: userData, isLoading: userIsLoading, error: userError } = useFetchSingleProfileQuery();

    useEffect(() => {
        if(userData && userData?.userProfile?.userType !== 'Admin'){
            setIsAdmin(false)
        }
    }, [userData]);

    return isAdmin ? <div>
        <main><Outlet/></main>
    </div> : <Navigate to={'/login'}/>
}

export default AdminRoute;