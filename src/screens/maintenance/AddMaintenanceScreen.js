import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { message } from "antd";

import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import { useVehicleMaintenanceAddMutation } from "../../slicers/maintenanceSlice";

import './AddMaintenanceScreen.css';

const AddMaintenanceScreen = () => {
    const navigate = useNavigate();
    const vehicleId = useParams().id;

    const [formData, setFormData] = useState({
        maintenanceType: '',
        isRegular: false,
        vehicleParts: [
            {
                vehiclePartName: "",
                cost: 0
            }
        ]
    });

    const [isFieldError, setIsFieldError] = useState({
        isMaintenanceTypeError: false,
        isVehiclePartsError: [
            {
                isVehiclePartNameError: false,
                isCostError: false
            }
        ]
    });

    const [vehicleMaintenanceAdd, { isLoading: maintenanceAddIsLoading }] = useVehicleMaintenanceAddMutation();

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const maintenanceTypeChangeHandler = (e) => {
        handleChange('maintenanceType', e.target.value);
    }

    const isRegularChangeHandler = (e) => {
        handleChange('isRegular', e.target.checked);
    }

    const vehiclePartNameChangeHandler = (e, index) => {
        const allVehicleParts = [...formData.vehicleParts];
        allVehicleParts[index].vehiclePartName = e.target.value;
        handleChange('vehicleParts', allVehicleParts);
    }

    const vehiclePartCostChangeHandler = (e, index) => {
        const allVehicleParts = [...formData.vehicleParts];
        allVehicleParts[index].cost = parseInt(e.target.value);
        handleChange('vehicleParts', allVehicleParts)
    }

    const vehiclePartAddHandler = () => {
        const allVehicleParts = [...formData.vehicleParts];
        const allVehiclePartError = [...isFieldError.isVehiclePartsError];

        allVehicleParts.push({
            vehiclePartName: "",
            cost: 0
        });

        allVehiclePartError.push({
            isVehiclePartNameError: false,
            isCostError: false
        });

        handleChange('vehicleParts', allVehicleParts);
        setIsFieldError({
            isMaintenanceTypeError: isFieldError.isMaintenanceTypeError,
            isVehiclePartsError: allVehiclePartError
        })
    }

    const addMaintenanceHandler = async () => {
        const maintenanceTypeValidity = formData.maintenanceType.trim().length > 3;
        let totalPartValidity = true;
        const partSpecificValidity = [];

        for(let part of formData.vehicleParts){
            const vehiclePartNameValidity = part.vehiclePartName.trim().length >= 1;
            const vehiclePartCostValidity = !isNaN(part.cost) && part.cost > 0;

            partSpecificValidity.push({
                isVehiclePartNameError: !vehiclePartNameValidity,
                isCostError: !vehiclePartCostValidity
            });

            if(!vehiclePartNameValidity || !vehiclePartCostValidity){
                totalPartValidity = false;
            }
        }

        if(maintenanceTypeValidity && totalPartValidity){
            try{
                const res = await vehicleMaintenanceAdd({
                    vehicleId: vehicleId,
                    maintenanceType: formData.maintenanceType,
                    isRegular: formData.isRegular,
                    vehicleParts: formData.vehicleParts
                })

                message.success(res?.message);
                navigate(-1);
            }catch (error){
                console.log(error);
                message.error(error?.data?.message);
            }
        }else {
            setIsFieldError({
                isMaintenanceTypeError: !maintenanceTypeValidity,
                isVehiclePartsError: partSpecificValidity
            })
        }
    }

    if(maintenanceAddIsLoading){
        return <div className={'loading-container'}>
            <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}}
                       wrapperClass="color-ring-wrapper"
                       colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
        </div>
    }else {
        return(
            <div className={'add-maintenance-screen'}>
                <div className={'add-maintenance-screen-container'}>
                    <p className={'add-maintenance-screen-title'}>Add Maintenance</p>
                    <CustomInput value={formData.maintenanceType} type={'text'} id={'maintenanceType'} onChangeHandle={maintenanceTypeChangeHandler}
                                 errorMessage={'Enter valid maintenance type'} title={'Enter Maintenance Type'}
                                 isError={isFieldError.isMaintenanceTypeError} placeholder={'Enter Maintenance Type'}/>
                    <CustomInput value={formData.isRegular} id={'isRegular'} errorMessage={''} isError={false} placeholder={'Selected Is Regular'}
                                 type={'checkbox'} title={'Is This Maintenance Regular'} onChangeHandle={isRegularChangeHandler}/>
                    {formData.vehicleParts.map((part, index) => {
                        return <div>
                            <CustomInput value={formData.vehicleParts[index].vehiclePartName} errorMessage={'Please Enter Valid Part Name'}
                                         isError={isFieldError.isVehiclePartsError[index].isVehiclePartNameError} id={`partName${index}`}
                                         type={'text'} title={'Enter Vehicle Part Name'} placeholder={'Enter vehicle part name'}
                                         onChangeHandle={(e) => vehiclePartNameChangeHandler(e, index) }/>
                            <CustomInput value={formData.vehicleParts[index].cost} placeholder={'Enter vehicle part cost'}
                                         onChangeHandle={vehiclePartCostChangeHandler} id={'vehiclePartCost'} type={'number'}
                                         title={'Enter Vehicle Part Cost'} isError={isFieldError.isVehiclePartsError[index].isCostError}
                                         errorMessage={'Please Enter Valid Part COst'}/>
                        </div>
                    })}
                    <div className={'add-maintenance-screen-button-container'}>
                        <CustomButton title={'Add Part'} onClick={vehiclePartAddHandler} bgColor={'transparent'} fontColor={'#f0f0f0'} isSmall={true}/>
                        <CustomButton title={'Add Maintenance'} onClick={addMaintenanceHandler} bgColor={'transparent'} fontColor={'#f0f0f0'}
                                      isSmall={true}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddMaintenanceScreen;