import { Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";

import LoginScreen from "./screens/login/LoginScreen";

import store from "./store";

import './App.css';

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <Routes>
                <Route path={'/login'} element={<LoginScreen/>}/>
            </Routes>
        </Provider>
    </div>
  );
}

export default App;
