import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";

import CustomFileSelect from "../../components/common/CustomFileSelect";
import CustomButton from "../../components/common/CustomButton";
import { useGeneratePresignedUrlMutation } from "../../slicers/fileSlice";
import { useUpdateVehicleCertificationMutation } from "../../slicers/vehicleSlice";

import './EditVehicleScreen.css';
import {message} from "antd";

const EditVehicleScreen = () => {
    const id = useParams().id;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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

    const [generatePresignedUrl, { isLoading: generatePresignedUrlLoading }] = useGeneratePresignedUrlMutation();
    const [updateVehicleCertification, { isLoading: updateVehicleIsLoading }] = useUpdateVehicleCertificationMutation();

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

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

            if(certification === null){
                continue;
            }

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
                CertificateType: certificateObj.certificationType,
                certificate: data?.urlResponse?.newFileName
            })
        }
        return allCertifications;
    }

    const handleSubmit = async () => {
        try{
            const allCertifications = await filesUploadHandler();

            const data = {
                vehicleCertificates: allCertifications
            }

            const res = await updateVehicleCertification({id, data}).unwrap();

            message.success(res?.message);
            navigate('/vehicles');
        }catch (error){
            console.log(error);
            message.error(error?.data?.message)
        }
    }

    if(generatePresignedUrlLoading || updateVehicleIsLoading){
        return <div className={'loading-container'}>
            <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}}
                       wrapperClass="color-ring-wrapper"
                       colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
        </div>
    }else {
        return(
            <div className={'edit-vehicle-screen'}>
                <div className={'edit-vehicle-screen-container'}>
                    <p className={'edit-vehicle-screen-title'}>Edit Vehicle Certifications</p>
                    <CustomFileSelect id={'insurance'} title={'Upload Vehicle Insurance'} acceptType={'pdf/*'}
                                      multiple={false} onChangeHandle={(e) => documentChangeHandler(e, 'Insurance')}/>
                    <CustomFileSelect id={'registration'} title={'Upload Vehicle Registration'}
                                      acceptType={'pdf/*'} multiple={false}
                                      onChangeHandle={(e) => documentChangeHandler(e, 'Registration')}/>
                    <CustomFileSelect id={'incomeCertificate'} title={'Upload Vehicle Income Certificate'}
                                      acceptType={'pdf/*'} multiple={false}
                                      onChangeHandle={(e) => documentChangeHandler(e, 'Income-Certificate')}/>
                    <CustomFileSelect id={'carbonCertificate'} title={'Upload Vehicle Carbon Certificate'}
                                      acceptType={'pdf/*'} multiple={false}
                                      onChangeHandle={(e) => documentChangeHandler(e, 'Carbon-Certificate')}/>
                    <CustomButton title={'Submit'} onClick={handleSubmit} bgColor={'transparent'} fontColor={'#f0f0f0'} isSmall={true}/>
                </div>
            </div>
        )
    }
}

export default EditVehicleScreen;