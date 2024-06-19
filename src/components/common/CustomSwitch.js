import React from 'react';

import './CustomSwitch.css';

const CustomSwitch = ({ checked, changeHandler }) => {
    return(
        <label className="custom-switch">
            <input type="checkbox" checked={checked} onChange={changeHandler}/>
            <span className="slider-red"></span>
        </label>
    )
}

export default CustomSwitch;