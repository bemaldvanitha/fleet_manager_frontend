import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { message } from "antd";
import axios from "axios";

import CustomButton from "../../components/common/CustomButton";
import DriverRegistrationFormPart2 from "../../components/drivers/DriverRegistrationFormPart2";
import { useGetSingleDriverQuery, useUpdateDriverMutation } from "../../slicers/driverSlice";
import { useGeneratePresignedUrlMutation } from "../../slicers/fileSlice";

import './EditDriverScreen.css';

const EditDriverScreen = () => {
    const navigate = useNavigate();
    const id = useParams().id;

    const [formData, setFormData] = useState({
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
        isFirstNameError: false,
        isLastNameError: false,
        isLicenceNumberError: false,
        isLicenceError: false,
        isMedicalApprovalError: false,
        isDrugTestError: false
    });

    const { data: singleDriverData, isLoading: singleDriverIsLoading, error: singleDriverError } = useGetSingleDriverQuery(id);
    const [updateDriver, {isLoading: updateDriverIsLoading}] = useUpdateDriverMutation();
    const [generatePresignedUrl, { isLoading: generatePresignedUrlLoading }] = useGeneratePresignedUrlMutation();

    useEffect(() => {
        if(singleDriverData && singleDriverData?.driver){
            const driver = singleDriverData?.driver;

            setFormData({
                ...formData,
                firstName: driver?.firstName,
                lastName: driver?.lastName,
                licenceNumber: driver?.licenceNumber
            });
        }
    }, [singleDriverData]);

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const filesUploadHandler = async () => {
        const allCertifications = [];

        for(let certificateObj of formData.driverCertifications){
            const certification = certificateObj.certification;

            if(certification === null){
                continue;
            }

            const certificationName = certification?.name;

            const data = await generatePresignedUrl({
                fileName: certificationName,
                fileExtention: `.${certificationName.split('.').pop()}`,
                destination: "driver"
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

    const updateHandler = async () => {
        const firstNameValidity = formData.firstName.trim().length >= 3;
        const lastNameValidity = formData.lastName.trim().length >= 3;
        const licenceNumberValidity = formData.licenceNumber.trim().length >= 8;

        if(firstNameValidity && lastNameValidity && licenceNumberValidity){
            try{
                const allCertifications = await filesUploadHandler();

                const data = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    licenceNumber: formData.licenceNumber,
                    vehicleCertifications: allCertifications,
                    driverId: id
                };

                const res = await updateDriver(data).unwrap();

                message.success(res?.message);
                navigate('/drivers');
            }catch (error){
                console.log(error);
                message.error(error?.data?.message)
            }
        }else {
            setIsFieldError({
                ...isFieldError,
                isFirstNameError: !firstNameValidity,
                isLastNameError: !lastNameValidity,
                isLicenceNumberError: !licenceNumberValidity,
            })
        }
    }

    const cancelHandler = () => {
        navigate('/drivers');
    }

    if(singleDriverIsLoading || updateDriverIsLoading || generatePresignedUrlLoading){
        return <div className={'loading-container'}>
            <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}}
                       wrapperClass="color-ring-wrapper"
                       colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
        </div>
    }else {
        return(
            <div className={'edit-drivers-screen'}>
                <div className={'edit-drivers-screen-container'}>
                    <p className={'edit-drivers-screen-title'}>Update Driver Info</p>
                    <DriverRegistrationFormPart2 formData={formData} isFieldError={isFieldError} onChange={handleChange}/>
                    <div className={'edit-drivers-screen-button-container'}>
                        <CustomButton title={'Update'} bgColor={'transparent'} fontColor={'#f0f0f0'} onClick={updateHandler}
                                      isSmall={true}/>
                        <CustomButton title={'Cancel'} bgColor={'transparent'} fontColor={'#f0f0f0'} onClick={cancelHandler}
                                      isSmall={true}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditDriverScreen;