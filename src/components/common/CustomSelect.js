import React from 'react';

import './CustomSelect.css';

const CustomSelect = ({ id, isError, errorMessage, title, value, onChangeHandle, options }) => {
    return(
        <div className={'custom-select-container'}>
            <label className={'custom-select-label'}>
                {title}
            </label>
            <select id={id} value={value} onChange={onChangeHandle} className={'custom-select'}>
                <option value="" disabled hidden>{id}</option>
                {options.map((option, index) => <option value={option.id} key={index}>{option.title}</option>)}
            </select>
            {isError && <p className={'custom-select-error'}>{errorMessage}</p>}
        </div>
    )
}

export default CustomSelect;