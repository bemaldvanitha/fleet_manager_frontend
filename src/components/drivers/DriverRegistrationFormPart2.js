import React from 'react';

import CustomInput from "../common/CustomInput";
import CustomFileSelect from "../common/CustomFileSelect";

import './DriverRegistrationForm.css';

const DriverRegistrationFormPart2 = ({ onChange, formData, isFieldError }) => {

    const firstNameChangeHandler = (e) => {
        onChange('firstName', e.target.value);
    }

    const lastNameChangeHandler = (e) => {
        onChange('lastName', e.target.value);
    }

    const licenceNumberChangeHandler = (e) => {
        onChange('licenceNumber', e.target.value);
    }

    const documentChangeHandler = (e, type) => {
        const current = formData.driverCertifications;
        const listIdx = current.findIndex(obj => obj.certificationType === type);
        current[listIdx].certification =  e.target.files[0];
        onChange('driverCertifications', current);
    }

    return(
        <div>
            <CustomInput id={'firstName'} value={formData.firstName} errorMessage={'Enter Valid First Name'} type={'text'}
                         isError={isFieldError.isFirstNameError} onChangeHandle={firstNameChangeHandler}
                         placeholder={'Enter First Name'} title={'Enter First Name'}/>
            <CustomInput id={'lastName'} value={formData.lastName} errorMessage={'Enter Valid Last Name'} type={'text'}
                         isError={isFieldError.isLastNameError} onChangeHandle={lastNameChangeHandler}
                         placeholder={'Enter Last Name'} title={'Enter Last Name'}/>
            <CustomInput id={'licenceNumber'} value={formData.licenceNumber} errorMessage={'Enter Valid Licence Number'} type={'text'}
                         isError={isFieldError.isLicenceNumberError} onChangeHandle={licenceNumberChangeHandler}
                         placeholder={'Enter Licence Number'} title={'Enter Licence Number'}/>
            <CustomFileSelect id={'licence'} title={'Upload Driver \'s Licence'} isError={isFieldError.isLicenceError}
                              errorMessage={'Please Upload Drivers Licence Copy'} acceptType={'pdf/*'} multiple={false}
                              onChangeHandle={(e) => documentChangeHandler(e, 'Licence')}/>
            <CustomFileSelect id={'medicalApproval'} title={'Upload Driver \'s Medical Approval'}
                              isError={isFieldError.isMedicalApprovalError} errorMessage={'Please Upload Drivers Medical Approval Copy'}
                              acceptType={'pdf/*'} multiple={false}
                              onChangeHandle={(e) => documentChangeHandler(e, 'Medical-Approval')}/>
            <CustomFileSelect id={'drugTestCertificate'} title={'Upload Driver \'s Drug Test Certificate'} acceptType={'pdf/*'}
                              isError={isFieldError.isDrugTestError} errorMessage={'Please Upload Drivers Drug Test Certificate Copy'}
                              multiple={false}
                              onChangeHandle={(e) => documentChangeHandler(e, 'Drug-Test-Certificate')}/>
        </div>
    )
}

export default DriverRegistrationFormPart2;