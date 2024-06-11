import React from 'react';

import './CustomInput.css';

const CustomInput = ({ id, isError, errorMessage, title, value, onChangeHandle, placeholder, type }) => {
    return(
        <div className={'custom-input-container'}>
            <label className={'custom-input-label'}>
                {title}
            </label>
            <input id={id} value={value} onChange={onChangeHandle} placeholder={placeholder} type={type}
                   className={'custom-input'}/>
            {isError && <p className={'custom-input-error'}>{errorMessage}</p>}
        </div>
    )
}

export default CustomInput;