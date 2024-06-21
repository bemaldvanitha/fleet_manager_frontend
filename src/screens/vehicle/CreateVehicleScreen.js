import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";

import CustomInput from "../../components/common/CustomInput";
import CustomFileSelect from "../../components/common/CustomFileSelect";
import CustomButton from "../../components/common/CustomButton";
import { useAddVehicleMutation } from "../../slicers/vehicleSlice";
import { useGeneratePresignedUrlMutation } from "../../slicers/fileSlice";

import './CreateVehicleScreen.css';

const CreateVehicleScreen = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        registrationNumber: '',
        vin: '',
        manufacturedAt: '',
        purchasedAt: '',
        isBrandNew: true,
        vehicleCertifications: [
            {
                certificationType: "Insurance",
                certificate: null
            },
            {
                certificationType: "Registration",
                certificate: null
            },
            {
                certificationType: "Income-Certificate",
                certificate: null
            },
            {
                certificationType: "Carbon-Certificate",
                certificate: null
            }
        ]
    });

    const [isFieldError, setIsFieldError] = useState({
        isBrandError: false,
        isModelError: false,
        isRegistrationNumberError: false,
        isVINError: false,
        isManufacturedAtError: false,
        isPurchasedAtError: false,
        isInsuranceError: false,
        isRegistrationError: false,
        isIncomeCertificateError: false,
        isCarbonCertificateError: false
    });

    const [addVehicle, { isLoading: addVehicleIsLoading }] = useAddVehicleMutation();
    const [generatePresignedUrl, { isLoading: generatePresignedUrlLoading }] = useGeneratePresignedUrlMutation();

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const vehicleBrandChangeHandler = (e) => {
        handleChange('brand', e.target.value);
    }

    const vehicleModelChangeHandler = (e) => {
        handleChange('model', e.target.value);
    }

    const vehicleRegistrationNumberChangeHandler = (e) => {
        handleChange('registrationNumber', e.target.value);
    }

    const vehicleVINChangeHandler = (e) => {
        handleChange('vin', e.target.value);
    }

    const vehicleManufacturedAtChangeHandler = (e) => {
        handleChange('manufacturedAt', e.target.value);
    }

    const vehiclePurchasedAtChangeHandler = (e) => {
        handleChange('purchasedAt', e.target.value);
    }

    const isBrandNewChangeHandler = (e) => {
        handleChange('isBrandNew', e.target.checked);
    }

    const documentChangeHandler = (e, type) => {
        const current = formData.vehicleCertifications;
        const listIdx = current.findIndex(obj => obj.certificationType === type);
        current[listIdx].certificate =  e.target.files[0];
        handleChange('vehicleCertifications', current);
    }

    const filesUploadHandler = async () => {
        const allCertifications = [];

        for(let certificateObj of formData.vehicleCertifications){
            const certification = certificateObj.certificate;
            const certificationName = certification?.name;

            const data = await generatePresignedUrl({
                fileName: certificationName,
                fileExtention: `.${certificationName.split('.').pop()}`,
                destination: "vehicle"
            }).unwrap();

            await axios.put(data?.urlResponse?.preSignedUrl, certification, {
                headers: {
                    "Content-Type": `.${certificationName.split('.').pop()}` || "application/octet-stream",
                },
            });

            allCertifications.push({
                certificationType: certificateObj.certificationType,
                certificate: data?.urlResponse?.newFileName
            })
        }
        return allCertifications;
    }

    const handleSubmit = async () => {
        const modelValidity = formData.model.trim().length >= 1;
        const brandValidity = formData.brand.trim().length >= 3;
        const registrationNumberValidity = formData.registrationNumber.trim().length >= 8;
        const vinValidity = formData.vin.trim().length >= 4;
        const manufacturedDataValidity = formData.manufacturedAt.trim().length !== ''
            && (new Date(formData.manufacturedAt) < new Date());
        const purchasedDateValidity = formData.purchasedAt.trim().length !== '' && (new Date(formData.purchasedAt) < new Date());
        const insuranceValidity = formData.vehicleCertifications[0].certificate !== null;
        const registrationValidity = formData.vehicleCertifications[1].certificate !== null;
        const incomeCertificateValidity = formData.vehicleCertifications[2].certificate !== null;
        const carbonCertificateValidity = formData.vehicleCertifications[3].certificate !== null;

        if(modelValidity && brandValidity && registrationValidity && registrationNumberValidity && vinValidity &&
            manufacturedDataValidity && purchasedDateValidity && insuranceValidity && incomeCertificateValidity && carbonCertificateValidity){
            try{
                const allCertifications = await filesUploadHandler();

                const res = await addVehicle({
                    brand: formData.brand,
                    model: formData.model,
                    registrationNumber: formData.registrationNumber,
                    vin: formData.vin,
                    manufacturedAt: formData.manufacturedAt,
                    purchasedAt: formData.purchasedAt,
                    isBrandNew: formData.isBrandNew,
                    vehicleCertifications: allCertifications
                }).unwrap();

                message.success(res?.message);
                navigate('/vehicles');
            }catch (error){
                console.log(error);
                message.error(error?.data?.message)
            }
        }else {
            setIsFieldError({
                isBrandError: !brandValidity,
                isModelError: !modelValidity,
                isRegistrationNumberError: !registrationNumberValidity,
                isVINError: !vinValidity,
                isManufacturedAtError: !manufacturedDataValidity,
                isPurchasedAtError: !purchasedDateValidity,
                isInsuranceError: !insuranceValidity,
                isRegistrationError: !registrationValidity,
                isIncomeCertificateError: !incomeCertificateValidity,
                isCarbonCertificateError: !carbonCertificateValidity
            });
        }
    }

    if(addVehicleIsLoading || generatePresignedUrlLoading) {
        return <div className={'loading-container'}>
            <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}}
                       wrapperClass="color-ring-wrapper"
                       colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
        </div>
    }else {
        return(
            <div className={'create-vehicle-screen'}>
                <div className={'create-vehicle-screen-container'}>
                    <p className={'create-vehicle-screen-title'}>Create New Vehicle</p>
                    <CustomInput value={formData.brand} id={'brand'} type={'text'} onChangeHandle={vehicleBrandChangeHandler}
                                 errorMessage={'Enter Valid Brand'} isError={isFieldError.isBrandError} title={'Enter Vehicle Brand'}
                                 placeholder={'Please enter vehicle brand'}/>
                    <CustomInput value={formData.model} id={'model'} type={'text'} onChangeHandle={vehicleModelChangeHandler}
                                 errorMessage={'Enter Valid Model'} isError={isFieldError.isModelError} title={'Enter Vehicle Model'}
                                 placeholder={'Please enter vehicle model'}/>
                    <CustomInput value={formData.registrationNumber} id={'registrationNumber'} type={'text'}
                                 onChangeHandle={vehicleRegistrationNumberChangeHandler} errorMessage={'Enter Valid Registration Number'}
                                 isError={isFieldError.isRegistrationNumberError} title={'Enter Vehicle Registration Number'}
                                 placeholder={'Please enter vehicle registration number'}/>
                    <CustomInput value={formData.vin} id={'vin'} type={'text'} onChangeHandle={vehicleVINChangeHandler}
                                 errorMessage={'Enter Valid Vehicle Identity Number'} isError={isFieldError.isVINError}
                                 title={'Enter Vehicle Identity Number'} placeholder={'Please enter vehicle identity number'}/>
                    <CustomInput value={formData.manufacturedAt} id={'manufacturedAt'} type={'date'} onChangeHandle={vehicleManufacturedAtChangeHandler}
                                 errorMessage={'Please Select Vehicle Manufactured Date'} isError={isFieldError.isManufacturedAtError}
                                 title={'Select Vehicle Manufactured Date'} placeholder={'Please select vehicle manufactured date'}/>
                    <CustomInput value={formData.purchasedAt} id={'purchasedAt'} type={'date'} onChangeHandle={vehiclePurchasedAtChangeHandler}
                                 errorMessage={'Please Select Vehicle Purchase Date'} isError={isFieldError.isPurchasedAtError}
                                 title={'Select Vehicle Purchase Date'} placeholder={'Please select vehicle purchase date'}/>
                    <CustomInput type={'checkbox'} title={'Select Brand New Or Not'} isError={false} errorMessage={''}
                                 placeholder={'Select is Brand new'} onChangeHandle={isBrandNewChangeHandler} id={'brandNew'}
                                 value={formData.isBrandNew}/>
                    <CustomFileSelect id={'insurance'} title={'Upload Vehicle Insurance'} isError={isFieldError.isInsuranceError}
                                      errorMessage={'Please Upload Vehicle Insurance Copy'} acceptType={'pdf/*'} multiple={false}
                                      onChangeHandle={(e) => documentChangeHandler(e, 'Insurance')}/>
                    <CustomFileSelect id={'registration'} title={'Upload Vehicle Registration'} isError={isFieldError.isRegistrationError}
                                      errorMessage={'Please Upload Vehicle Registration Copy'} acceptType={'pdf/*'} multiple={false}
                                      onChangeHandle={(e) => documentChangeHandler(e, 'Registration')}/>
                    <CustomFileSelect id={'incomeCertificate'} title={'Upload Vehicle Income Certificate'}
                                      isError={isFieldError.isIncomeCertificateError} acceptType={'pdf/*'} multiple={false}
                                      errorMessage={'Please Upload Vehicle Income Certificate Copy'}
                                      onChangeHandle={(e) => documentChangeHandler(e, 'Income-Certificate')}/>
                    <CustomFileSelect id={'carbonCertificate'} title={'Upload Vehicle Carbon Certificate'}
                                      isError={isFieldError.isCarbonCertificateError} acceptType={'pdf/*'} multiple={false}
                                      errorMessage={'Please Upload Vehicle Carbon Certificate Copy'}
                                      onChangeHandle={(e) => documentChangeHandler(e, 'Carbon-Certificate')}/>
                    <CustomButton title={'Submit'} onClick={handleSubmit} bgColor={'transparent'} fontColor={'#f0f0f0'} isSmall={true}/>
                </div>
            </div>
        )
    }
}

export default CreateVehicleScreen;