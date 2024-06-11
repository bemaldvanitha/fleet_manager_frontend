import React, { useState } from 'react';

import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";

import './LoginScreen.css';

const LoginScreen = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');

    const [mobileNumberError, setMobileNumberError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const mobileNumberChangeHandler = (e) => {
        setMobileNumber(e.target.value);
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const submitHandler = async () => {
        const mobilePhoneNumberValidity = mobileNumber.trim().length > 8 && mobileNumber.trim().length < 15;
        const passwordValidity = password.trim().length >= 6;

        if(mobilePhoneNumberValidity && passwordValidity){

        }else {
            setMobileNumberError(!mobilePhoneNumberValidity);
            setPasswordError(!passwordValidity);
        }
    }

    const signupHandler = () => {

    }

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

export default LoginScreen;