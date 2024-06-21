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
                </Route>
            </Routes>
        </Provider>
    </div>
  );
}

export default App;
