import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import { useSaveFuelRefillMutation } from "../../slicers/fuelSlice";

import './AddFuelRefillScreen.css';
import {message} from "antd";

const AddFuelRefillScreen = () => {
    const navigate = useNavigate();
    const vehicleId = useParams().id;

    const [formData, setFormData] = useState({
        fuelAmount: 0,
        cost: 0,
        startFuelLevel: '',
        endFuelLevel: ''
    });

    const [isFieldError, setIsFieldError] = useState({
        isFuelAmountError: false,
        isCostError: false,
        isStartFuelLevelError: false,
        isEndFuelLevelError: false
    });

    const [saveFuelRefill, { isLoading: saveFuelRefillIsLoading }] = useSaveFuelRefillMutation();

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const fuelAmountChangeHandler = (e) => {
        handleChange('fuelAmount', parseInt(e.target.value));
    }

    const costChangeHandler = (e) => {
        handleChange('cost', parseInt(e.target.value));
    }

    const startFuelLevelChangeHandler = (e) => {
        handleChange('startFuelLevel', e.target.value);
    }

    const endFuelLevelChangeHandler = (e) => {
        handleChange('endFuelLevel', e.target.value);
    }

    const getCurrentLocation = async () => {
        if (!navigator.geolocation) {
            console.error('Geolocation is not supported by this browser.');
            return { latitude: 0, longitude: 0 };
        }

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            return {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };
        } catch (error) {
            console.error('Error getting geolocation:', error.message);
            return { latitude: 0, longitude: 0 };
        }
    }

    const getAddressFromCoordinates = async (latitude, longitude) => {
        const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
        );
        const data = await response.json();
        if (data.status === 'OK') {
            return data.results[0].formatted_address;
        } else {
            return "Could not fetch address";
        }
    }

    const submitHandler = async () => {
        const fuelAmountValidity = !isNaN(formData.fuelAmount) && formData.fuelAmount > 0;
        const fuelCostValidity = !isNaN(formData.cost) && formData.cost > 0;
        const startFuelLevelValidity = parseInt(formData.startFuelLevel) > 0;
        const endFuelLevelValidity = parseInt(formData.endFuelLevel) > 0;

        if(fuelAmountValidity && fuelCostValidity && startFuelLevelValidity && endFuelLevelValidity){
            try{
                const { latitude, longitude } = await getCurrentLocation();
                const address = await getAddressFromCoordinates(latitude, longitude);

                const res = await saveFuelRefill({
                    vehicleId: vehicleId,
                    fuelAmount: formData.fuelAmount,
                    cost: formData.cost,
                    startFuelLevel: `${formData.startFuelLevel}%`,
                    endFuelLevel: `${formData.endFuelLevel}%`,
                    fuelRefillLocation: {
                        latitude: latitude,
                        longitude: longitude,
                        address: address
                    }
                }).unwrap();

                message.success(res?.message);
                navigate(-1);
            }catch (error){
                console.log(error);
                message.error(error?.data?.message);
            }
        }else {
            setIsFieldError({
                isFuelAmountError: !fuelAmountValidity,
                isCostError: !fuelCostValidity,
                isStartFuelLevelError: !startFuelLevelValidity,
                isEndFuelLevelError: !endFuelLevelValidity
            })
        }
    }

    if(saveFuelRefillIsLoading){
        return <div className={'loading-container'}>
            <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}}
                       wrapperClass="color-ring-wrapper"
                       colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
        </div>
    }else {
        return(
            <div className={'add-fuel-refill-screen'}>
                <div className={'add-fuel-refill-screen-container'}>
                    <p className={'add-fuel-refill-screen-title'}>Add Fuel Refill</p>
                    <CustomInput id={'fuelAmount'} value={formData.fuelAmount} onChangeHandle={fuelAmountChangeHandler} type={'number'}
                                 isError={isFieldError.isFuelAmountError} errorMessage={'Enter Valid Fuel Amount'}
                                 placeholder={'Enter Fuel Amount'} title={'Enter Fuel Amount'}/>
                    <CustomInput id={'cost'} value={formData.cost} onChangeHandle={costChangeHandler} type={'number'}
                                 isError={isFieldError.isCostError} errorMessage={'Enter Valid Fuel Cost'}
                                 placeholder={'Enter Fuel Cost'} title={'Enter Fuel Cost'}/>
                    <CustomInput id={'startFuelLevel'} value={formData.startFuelLevel} onChangeHandle={startFuelLevelChangeHandler}
                                 type={'number'} isError={isFieldError.isStartFuelLevelError} errorMessage={'Enter Valid Start Fuel Level'}
                                 placeholder={'Enter Start Fuel Level'} title={'Enter Start Fuel Level'}/>
                    <CustomInput id={'endFuelLevel'} value={formData.endFuelLevel} onChangeHandle={endFuelLevelChangeHandler} type={'number'}
                                 isError={isFieldError.isEndFuelLevelError} errorMessage={'Enter Valid End Fuel Level'}
                                 placeholder={'Enter End Fuel Level'} title={'Enter End Fuel Level'}/>
                    <CustomButton title={'Submit'} onClick={submitHandler} bgColor={'transparent'} fontColor={'#f0f0f0'} isSmall={true}/>
                </div>
            </div>
        )
    }
}

export default AddFuelRefillScreen;