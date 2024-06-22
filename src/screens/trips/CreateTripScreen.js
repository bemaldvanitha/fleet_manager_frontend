import React, {useEffect, useState} from 'react';
import { ColorRing } from "react-loader-spinner";

import CustomSelect from "../../components/common/CustomSelect";
import CustomInput from "../../components/common/CustomInput";
import CustomFileSelect from "../../components/common/CustomFileSelect";
import CustomButton from "../../components/common/CustomButton";
import { useFetchAvailableDriversQuery } from "../../slicers/driverSlice";
import { useFetchAvailableVehiclesQuery } from "../../slicers/vehicleSlice";

import './CreateTripScreen.css';

const CreateTripScreen = () => {
    const [formData, setFormData] = useState({
       driverId: '',
       vehicleId: '',
       startLocation: {
           latitude: 0,
           longitude: 0,
           address: ''
       },
       endLocation: {
           latitude: 0,
           longitude: 0,
           address: ''
       },
       tripCertifications: [
           {
               certificateType: "Cargo-Insurance",
               certificate: null
           },
           {
               certificateType: "Weight-Certificate",
               certificate: null
           },
           {
               certificateType: "Customs-Clearance-Certificate",
               certificate: null
           }
       ]
    });

    const [isFieldError, setIsFieldError] = useState({
        isDriverIdError: false,
        isVehicleIdError: false,
        isStartLocationError: false,
        isEndLocationError: false,
        isCargoInsuranceError: false,
        isWeightCertificateError: false,
        isCustomsClearanceError: false,
    });

    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const { data: driversData, isLoading: fetchDriversIsLoading, error: fetchDriversError } = useFetchAvailableDriversQuery();
    const { data: vehiclesData, isLoading: fetchVehiclesIsLoading, error: fetchVehiclesError } = useFetchAvailableVehiclesQuery();

    useEffect(() => {
        const finalVehicleList = [];
        const finalDriverList = [];

        if(driversData && driversData?.drivers){
            for(let driver of driversData?.drivers){
                finalDriverList.push({
                    id: driver?.id,
                    title: `${driver?.firstName} ${driver?.lastName}`
                })
            }
            setDrivers(finalDriverList);
        }

        if(vehiclesData && vehiclesData?.vehicles){
            for(let vehicle of vehiclesData?.vehicles) {
                finalVehicleList.push({
                    id: vehicle?.id,
                    title: vehicle?.vin
                });
            }
            setVehicles(finalVehicleList);
        }
    }, [driversData, vehiclesData]);

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const selectedVehicleChangeHandler = (e) => {
        handleChange('vehicleId', e.target.value);
    }

    const selectedDriverChangeHandler = (e) => {
        handleChange('driverId', e.target.value);
    }

    const startLocationAddressChangeHandler = (e) => {
        handleChange('startLocation', {
            latitude: 0,
            longitude: 0,
            address: e.target.value
        });
    }

    const endLocationAddressChangeHandler = (e) => {
        handleChange('endLocation',{
            latitude: 0,
            longitude: 0,
            address: e.target.value
        });
    }

    const documentChangeHandler = (e, type) => {
        const current = formData.tripCertifications;
        const listIdx = current.findIndex(obj => obj.certificationType === type);
        current[listIdx].certification =  e.target.files[0];
        handleChange('tripCertifications', current);
    }



    const handleSubmit = async () => {
        const driverIdValidity = formData.driverId.trim().length > 5;
        const vehicleIdValidity = formData.vehicleId.trim().length > 5;
        const startLocationValidity = formData.startLocation.address.trim().length >= 3;
        const endLocationValidity = formData.endLocation.address.trim().length >= 3;
        const cargoInsuranceValidity = formData.tripCertifications[0].certificate !== null;
        const weightCertificateValidity = formData.tripCertifications[1].certificate !== null;
        const customsClearanceValidity = formData.tripCertifications[2].certificate !== null;

        if(driverIdValidity && vehicleIdValidity && startLocationValidity && endLocationValidity && cargoInsuranceValidity
            && weightCertificateValidity && customsClearanceValidity){
            const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

        }else {
            setIsFieldError({
                isDriverIdError: !driverIdValidity,
                isVehicleIdError: !vehicleIdValidity,
                isStartLocationError: !startLocationValidity,
                isEndLocationError: !endLocationValidity,
                isCargoInsuranceError: !cargoInsuranceValidity,
                isWeightCertificateError: !weightCertificateValidity,
                isCustomsClearanceError: !customsClearanceValidity
            });
        }
    }

    if(fetchVehiclesIsLoading || fetchDriversIsLoading){
        return <div className={'loading-container'}>
            <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}}
                       wrapperClass="color-ring-wrapper"
                       colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
        </div>
    }else {
        return(
            <div className={'create-trip-screen'}>
                <div className={'create-trip-screen-container'}>
                    <p className={'create-trip-screen-title'}>Create New Trip</p>
                    <CustomSelect value={formData.vehicleId} id={'vehicle'} onChangeHandle={selectedVehicleChangeHandler}
                                  errorMessage={'Select a Trip Vehicle'} isError={isFieldError.isVehicleIdError}
                                  title={'Select a Vehicle'} options={vehicles}/>
                    <CustomSelect value={formData.driverId} id={'driver'} onChangeHandle={selectedDriverChangeHandler}
                                  errorMessage={'Select a Trip Driver'} isError={isFieldError.isDriverIdError}
                                  title={'Select a Driver'} options={drivers}/>
                    <CustomInput id={'startLocation'} title={'Start Location Address'} isError={isFieldError.isStartLocationError}
                                 value={formData.startLocation.address} errorMessage={'Please Enter Start Location Address'}
                                 type={'text'} placeholder={'Enter Start Location Address'}
                                 onChangeHandle={startLocationAddressChangeHandler}/>
                    <CustomInput id={'endLocation'} title={'End Location Address'} isError={isFieldError.isEndLocationError}
                                 value={formData.endLocation.address} errorMessage={'Please Enter End Location Address'}
                                 type={'text'} placeholder={'Enter End Location Address'}
                                 onChangeHandle={endLocationAddressChangeHandler}/>
                    <CustomFileSelect id={'cargoInsurance'} title={'Upload Cargo Insurance'}
                                      isError={isFieldError.isCargoInsuranceError}  acceptType={'pdf/*'} multiple={false}
                                      errorMessage={'Please Upload Cargo Licence Insurance'}
                                      onChangeHandle={(e) => documentChangeHandler(e, 'Cargo-Insurance')}/>

                    <CustomFileSelect id={'weightCertificate'} title={'Upload Weight Certificate'}
                                      isError={isFieldError.isWeightCertificateError} acceptType={'pdf/*'} multiple={false}
                                      errorMessage={'Please Upload Cargo Weight Certificate'}
                                      onChangeHandle={(e) => documentChangeHandler(e, 'Weight-Certificate')}/>

                    <CustomFileSelect id={'customsClearanceCertificate'} title={'Upload Customs Clearance Certificate'}
                                      isError={isFieldError.isCustomsClearanceError} acceptType={'pdf/*'} multiple={false}
                                      errorMessage={'Please Upload Customs Clearance Certificate'}
                                      onChangeHandle={(e) => documentChangeHandler(e, 'Customs-Clearance-Certificate')}/>
                    <CustomButton title={'Submit'} onClick={handleSubmit} bgColor={'transparent'} fontColor={'#f0f0f0'}
                                  isSmall={true}/>
                </div>
            </div>
        )
    }
}

export default CreateTripScreen;