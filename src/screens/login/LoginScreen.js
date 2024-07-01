import React, { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import { useFetchSingleProfileQuery, useLoginMutation } from "../../slicers/authSlice";
import { useFetchDriverIdToUserIdQuery } from "../../slicers/driverSlice";

import './LoginScreen.css';

const LoginScreen = () => {
    const navigate = useNavigate();

    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');

    const [mobileNumberError, setMobileNumberError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [login, { isLoading }] = useLoginMutation();
    const { data: userData, isLoading: userIsLoading, error: userError } = useFetchSingleProfileQuery();
    const { data: driverData, isLoading: driverIsLoading, error: driverError } =
        useFetchDriverIdToUserIdQuery(userData?.userProfile?.id);

    const mobileNumberChangeHandler = (e) => {
        setMobileNumber(e.target.value);
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const submitHandler = async () => {
        setMobileNumberError(false);
        setPasswordError(false);

        const mobilePhoneNumberValidity = mobileNumber.trim().length > 8 && mobileNumber.trim().length < 15;
        const passwordValidity = password.trim().length >= 6;

        if(mobilePhoneNumberValidity && passwordValidity){
            try{
                const res = await login({
                    password: password,
                    mobileNumber: mobileNumber
                }).unwrap();

                message.success(res?.message);

                if(res?.userType === 'Admin'){
                    navigate('/vehicles');
                }else if(res?.userType === 'Fleet-Manager'){
                    navigate('/trips');
                }else if(res?.userType === 'Driver'){
                    navigate(`/trips/${driverData?.driverId}`);
                }
            }catch (err){
                console.log(err);
                message.error(err?.data?.message)
            }
        }else {
            setMobileNumberError(!mobilePhoneNumberValidity);
            setPasswordError(!passwordValidity);
        }
    }

    const signupHandler = () => {

    }

    if(isLoading || driverIsLoading || userIsLoading){
        return (
            <div className={'loading-container'}>
                <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
            </div>
        )
    }else {
        return(
            <div className={'login-screen'}>
                <div className={'login-screen-container'}>
                    <p className={'login-screen-title'}>Login</p>
                    <p className={'login-screen-description'}>Welcome back!</p>
                    <CustomInput type={'tel'} value={mobileNumber} id={'mobileNumber'} title={'Enter Mobile Number'}
                                 isError={mobileNumberError} errorMessage={'Enter Valid Mobile Number'}
                                 onChangeHandle={mobileNumberChangeHandler} placeholder={'Enter Mobile Number'}/>
                    <CustomInput type={'password'} value={password} placeholder={'Enter Password'}
                                 onChangeHandle={passwordChangeHandler} errorMessage={'Enter Valid Password (password must be more that 5 chars)'}
                                 isError={passwordError}
                                 id={'password'} title={'Enter Password'}/>
                    <CustomButton title={'Login!'} bgColor={'transparent'} fontColor={'#f0f0f0'} onClick={submitHandler}/>
                    <div className={'login-screen-body-signup-container'}>
                        <p className={'login-screen-body-signup-container-text'}>Don't have an account!</p>
                        <p onClick={signupHandler} className={'login-screen-body-signup-container-text-link'}>Signup!</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginScreen;