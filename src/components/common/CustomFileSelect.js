import React from "react";

import './CustomFileSelect.css';

const CustomFileSelect = ({ id, isError = false, errorMessage = '', title, onChangeHandle, multiple = false,
                              acceptType = "image/*"  }) => {
    return (
        <div className={'custom-file-container'}>
            <label className={'custom-file-label'} htmlFor={id}>
                {title}
            </label>
            <input id={id} onChange={onChangeHandle} type={'file'} className={'custom-file-input'} multiple={multiple} accept={acceptType}/>
            {isError && <p className={'custom-file-error'}>{errorMessage}</p>}
        </div>
    )
}

export default CustomFileSelect;