import React from 'react';

import './CustomButton.css';

const CustomButton = ({ title, bgColor, fontColor, onClick }) => {
    return(
        <div onClick={onClick} style={{backgroundColor: bgColor, borderColor: fontColor}} className={'custom-button-container'}>
            <p style={{color: fontColor}} className={'custom-button-text'}>{title}</p>
        </div>
    )
}

export default CustomButton;