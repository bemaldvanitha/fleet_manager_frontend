import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { ColorRing } from "react-loader-spinner";

import DriverRegistrationFormPart1 from "../../components/drivers/DriverRegistrationFormPart1";
import CustomButton from "../../components/common/CustomButton";
import { useRegisterMutation } from "../../slicers/authSlice";

import './AddFleetManagerScreen.css';

const AddFleetManagerScreen = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        reEnterPassword: '',
        mobileNumber: '',
        displayName: ''
    });

    const [isFieldError, setIsFieldError] = useState({
        isEmailError: false,
        isPasswordError: false,
        isMobileNumberError: false,
        isDisplayNameError: false
    });

    const [register, { isLoading: registerIsLoading }] = useRegisterMutation();

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValidity = emailRegex.test(formData.email.trim());
        const passwordValidity = formData.password.trim().length >= 5 && formData.password.trim() ===
            formData.reEnterPassword.trim();
        const mobileNameValidity = formData.mobileNumber.trim().length > 8;
        const displayNameValidity = formData.displayName.trim().length >= 3;

        if(emailValidity && passwordValidity && mobileNameValidity && displayNameValidity){
            try{
                const res = await register({
                    email: formData.email,
                    password: formData.password,
                    mobileNumber: formData.mobileNumber,
                    displayName: formData.displayName,
                    userType: 'Fleet-Manager'
                }).unwrap();

                setFormData({
                    ...formData,
                    userId: res.id
                });

                message.success(res?.message);
                navigate('/fleet-managers')
            }catch (error){
                console.log(error);
                message.error(error?.data?.message)
            }
        }else {
            setIsFieldError({
                isEmailError: !emailValidity, isPasswordError: !passwordValidity, isMobileNumberError: !mobileNameValidity,
                isDisplayNameError: !displayNameValidity,
            });
        }
    }

    if(registerIsLoading){
        return <div className={'loading-container'}>
            <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}}
                       wrapperClass="color-ring-wrapper"
                       colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
        </div>
    }else {
        return(
            <div className={'create-fleet-manager-screen'}>
                <div className={'create-fleet-manager-screen-container'}>
                    <p className={'create-fleet-manager-screen-title'}>Create New Fleet Manager</p>
                    <DriverRegistrationFormPart1 formData={formData} isFieldError={isFieldError} onChange={handleChange}/>
                    <CustomButton title={'Submit'} onClick={handleSubmit} bgColor={'transparent'} fontColor={'#f0f0f0'} isSmall={true}/>
                </div>
            </div>
        )
    }
}

export default AddFleetManagerScreen;