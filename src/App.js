import { Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";

import LoginScreen from "./screens/login/LoginScreen";
import AllDriversScreen from "./screens/drivers/AllDriversScreen";
import AdminRoute from "./components/routing/AdminRoute";

import store from "./store";

import './App.css';

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <Routes>
                <Route path={'/login'} element={<LoginScreen/>}/>
                <Route path={''} element={<AdminRoute/>}>
                    <Route path={'/all-drivers'} element={<AllDriversScreen/>}/>
                </Route>
            </Routes>
        </Provider>
    </div>
  );
}

export default App;
