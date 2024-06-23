import React, { useState, useEffect }  from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useFetchSingleProfileQuery } from "../../slicers/authSlice";

const DriverRoute = () => {
    const [isAuth, setIsAuth] = useState(true);

    const { data: userData, isLoading: userIsLoading, error: userError } = useFetchSingleProfileQuery();

    useEffect(() => {
        if(!userData && !userIsLoading){
            setIsAuth(false)
        }
    }, [userData]);

    return isAuth ? <div>
        <main><Outlet/></main>
    </div> : <Navigate to={'/login'}/>
}

export default DriverRoute;