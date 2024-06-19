import React from 'react';

import CustomInput from "../common/CustomInput";

import './DriverRegistrationForm.css';

const DriverRegistrationFormPart1 = ({ onChange, formData, isFieldError }) => {

    const emailChangeHandler = (e) => {
        onChange('email', e.target.value);
    }

    const passwordChangeHandler = (e) => {
        onChange('password', e.target.value);
    }

    const reEnterPasswordChangeHandler = (e) => {
        onChange('reEnterPassword', e.target.value);
    }

    const mobileNumberChangeHandler = (e) => {
        onChange('mobileNumber', e.target.value);
    }

    const displayNameChangeHandler = (e) => {
        onChange('displayName', e.target.value);
    }

    return(
        <div>
            <CustomInput title={'Enter Driver\'s Email'} type={'email'} id={'email'} isError={isFieldError.isEmailError}
                         errorMessage={'Enter Valid Email'} onChangeHandle={emailChangeHandler} value={formData.email}
                         placeholder={'Enter Driver\'s Email'}/>
            <CustomInput title={'Enter Password'} value={formData.password} placeholder={'Enter Password'} type={'password'}
                         onChangeHandle={passwordChangeHandler} id={'password'} isError={isFieldError.isPasswordError}
                         errorMessage={'Enter valid password (password should more that 5 chars and must be equal)'}/>
            <CustomInput title={'Re-Enter Password'} value={formData.reEnterPassword} placeholder={'Re-Enter Password'}
                         type={'password'} onChangeHandle={reEnterPasswordChangeHandler} id={'password2'}
                         isError={isFieldError.isPasswordError}
                         errorMessage={'Enter valid password (password should more that 5 chars and must be equal)'}/>
            <CustomInput title={'Enter Mobile Number'} isError={isFieldError.isMobileNumberError} onChangeHandle={mobileNumberChangeHandler}
                         errorMessage={'Enter valid mobile number'} type={'tel'} placeholder={'Enter mobile number'}
                         value={formData.mobileNumber} id={'mobileNumber'}/>
            <CustomInput title={'Enter Display Name'} value={formData.displayName} placeholder={'Enter Display Name'}
                         onChangeHandle={displayNameChangeHandler} type={'text'} isError={isFieldError.isDisplayNameError}
                         id={'displayName'} errorMessage={'Enter valid display name'}/>
        </div>
    )
}

export default DriverRegistrationFormPart1;