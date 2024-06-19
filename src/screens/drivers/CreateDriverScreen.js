import React, { useState, useEffect } from 'react';
import { Steps } from 'antd';

import CustomButton from "../../components/common/CustomButton";
import DriverRegistrationFormPart1 from "../../components/drivers/DriverRegistrationFormPart1";
import DriverRegistrationFormPart2 from "../../components/drivers/DriverRegistrationFormPart2";

import './CreateDriverScreen.css';

const { Step } = Steps;

const steps = [
    {
        title: 'General Info',
        component: DriverRegistrationFormPart1,
    },
    {
        title: 'Investment Info',
        component: DriverRegistrationFormPart2,
    }
];

const CreateDriverScreen = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        reEnterPassword: '',
        mobileNumber: '',
        displayName: '',

        userId: '',
        firstName: '',
        lastName: '',
        licenceNumber: '',
        driverCertifications: [
            {
                certificationType: 'Licence',
                certification: null,
                certificationLink: ''
            },
            {
                certificationType: 'Medical-Approval',
                certification: null,
                certificationLink: ''
            },
            {
                certificationType: 'Drug-Test-Certificate',
                certification: null,
                certificationLink: ''
            },
        ]
    });

    const [isFieldError, setIsFieldError] = useState({
        isEmailError: false,
        isPasswordError: false,
        isMobileNumberError: false,
        isDisplayNameError: false,

        isUserIdError: false,
        isFirstNameError: false,
        isLastNameError: false,
        isLicenceNumberError: false,
        isLicenceError: false,
        isMedicalApprovalError: false,
        isDrugTestError: false
    });

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleNext = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValidity = emailRegex.test(formData.email.trim());
        const passwordValidity = formData.password.trim().length >= 5 && formData.password.trim() ===
            formData.reEnterPassword.trim();
        const mobileNameValidity = formData.mobileNumber.trim().length > 8;
        const displayNameValidity = formData.displayName.trim().length >= 3;

        if(emailValidity && passwordValidity && mobileNameValidity && displayNameValidity){
            setCurrentStep(currentStep + 1);
        }else {
            setIsFieldError({
                isEmailError: !emailValidity, isPasswordError: !passwordValidity, isMobileNumberError: !mobileNameValidity,
                isDisplayNameError: !displayNameValidity,

                isUserIdError: false, isFirstNameError: false, isLastNameError: false, isLicenceNumberError: false,
                isLicenceError: false, isMedicalApprovalError: false, isDrugTestError: false
            });
        }
    }

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    }

    const handleSubmit = () => {
        const firstNameValidity = formData.firstName.trim().length >= 3;
        const lastNameValidity = formData.lastName.trim().length >= 3;
        const licenceNumberValidity = formData.licenceNumber.trim().length >= 8;
        const licenceValidity = formData.driverCertifications[0].certification !== null;
        const medicalApproveValidity = formData.driverCertifications[1].certification !== null;
        const drugTestValidity = formData.driverCertifications[2].certification !== null;

        if(firstNameValidity && lastNameValidity && licenceNumberValidity && licenceValidity && medicalApproveValidity &&
            drugTestValidity){


        }else {
            setIsFieldError({
                isEmailError: isFieldError.isEmailError, isPasswordError: isFieldError.isPasswordError,
                isMobileNumberError: isFieldError.isMobileNumberError, isDisplayNameError: isFieldError.isDisplayNameError,

                isUserIdError: !firstNameValidity, isFirstNameError: !lastNameValidity, isLastNameError: !lastNameValidity,
                isLicenceNumberError: !licenceNumberValidity, isLicenceError: !licenceValidity,
                isMedicalApprovalError: !medicalApproveValidity, isDrugTestError: !drugTestValidity
            });
        }
    }

    const CurrentStepComponent = steps[currentStep].component;

    return(
        <div className={'create-drivers-screen'}>
            <div className={'create-drivers-screen-container'}>
                <p className={'create-drivers-screen-title'}>Create New Driver</p>
                <div>
                    {<CurrentStepComponent onChange={handleChange} formData={formData} isFieldError={isFieldError}/>}
                </div>
                <div>
                    <Steps progressDot current={currentStep} className="custom-steps">
                        {steps.map((step) => (
                            <Step key={step.title} title={step.title} style={{color: '#f0f0f0'}}/>
                        ))}
                    </Steps>
                </div>
                <div className={'create-drivers-screen-button-container'}>
                    { currentStep !== 0 && <CustomButton title={'Previous'} isSmall={true}
                                                         onClick={ handlePrevious } bgColor={'transparent'} fontColor={'#f0f0f0'}/>}
                    {currentStep < steps.length - 1 ? (
                        <CustomButton title={'Next'} onClick={ handleNext } bgColor={'transparent'} fontColor={'#f0f0f0'}
                                      isSmall={true}/>
                    ) : (
                        <CustomButton title={'Submit'} onClick={handleSubmit} className={'register-button'} bgColor={'transparent'}
                                      fontColor={'#f0f0f0'} isSmall={true}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateDriverScreen;