import { Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";

import LoginScreen from "./screens/login/LoginScreen";
import AllDriversScreen from "./screens/drivers/AllDriversScreen";
import CreateDriverScreen from "./screens/drivers/CreateDriverScreen";
import EditDriverScreen from "./screens/drivers/EditDriverScreen";
import SingleDriverScreen from "./screens/drivers/SingleDriverScreen";
import AdminRoute from "./components/routing/AdminRoute";
import AllVehicleScreen from "./screens/vehicle/AllVehicleScreen";
import CreateVehicleScreen from "./screens/vehicle/CreateVehicleScreen";
import EditVehicleScreen from "./screens/vehicle/EditVehicleScreen";
import AllFleetManagerScreen from "./screens/fleet-manager/AllFleetManagerScreen";
import AddFleetManagerScreen from "./screens/fleet-manager/AddFleetManagerScreen";
import AdminOrFleetManagerRoute from "./components/routing/AdminOrFleetManagerRoute";
import AllTripsScreen from "./screens/trips/AllTripsScreen";
import CreateTripScreen from "./screens/trips/CreateTripScreen";
import DriverRoute from "./components/routing/DriverRoute";
import AllTripToDriver from "./screens/trips/AllTripToDriver";
import SingleTripScreen from "./screens/trips/SingleTripScreen";
import AddFuelRefillScreen from "./screens/fuel/AddFuelRefillScreen";
import AddMaintenanceScreen from "./screens/maintenance/AddMaintenanceScreen";
import AllFuelRefillsScreen from "./screens/fuel/AllFuelRefillsScreen";

import store from "./store";

import './App.css';

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <Routes>
                <Route path={'/login'} element={<LoginScreen/>}/>
                <Route path={''} element={<AdminRoute/>}>
                    <Route path={'/drivers'} element={<AllDriversScreen/>}/>
                    <Route path={'/drivers/create'} element={<CreateDriverScreen/>}/>
                    <Route path={'/drivers/edit/:id'} element={<EditDriverScreen/>}/>
                    <Route path={'/drivers/:id'} element={<SingleDriverScreen/>}/>
                    <Route path={'/vehicles'} element={<AllVehicleScreen/>}/>
                    <Route path={'/vehicles/create'} element={<CreateVehicleScreen/>}/>
                    <Route path={'/vehicles/edit/:id'} element={<EditVehicleScreen/>}/>
                    <Route path={'/fleet-managers'} element={<AllFleetManagerScreen/>}/>
                    <Route path={'/fleet-managers/create'} element={<AddFleetManagerScreen/>}/>
                </Route>
                <Route path={''} element={<AdminOrFleetManagerRoute/>}>
                    <Route path={'/trips'} element={<AllTripsScreen/>}/>
                    <Route path={'/trips/create'} element={<CreateTripScreen/>}/>
                    <Route path={'/fuel'} element={<AllFuelRefillsScreen/>}/>
                </Route>
                <Route path={''} element={<DriverRoute/>}>
                    <Route path={'/trips/:id'} element={<AllTripToDriver/>}/>
                    <Route path={'/trips/info/:id'} element={<SingleTripScreen/>}/>
                    <Route path={'/fuel/create/:id'} element={<AddFuelRefillScreen/>}/>
                    <Route path={'/maintenance/create/:id'} element={<AddMaintenanceScreen/>}/>
                </Route>
            </Routes>
        </Provider>
    </div>
  );
}

export default App;
