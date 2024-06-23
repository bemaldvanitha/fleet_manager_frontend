import React, { useState, useEffect } from 'react';
import { ColorRing } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { message } from "antd";

import CustomButton from "../../components/common/CustomButton";
import CustomInput from "../../components/common/CustomInput";
import { useFetchSingleTripQuery, useStartTripMutation, useTripEndMutation, useTripStopStartMutation, useTripStopEndMutation,
    useSaveTripLocationMutation } from "../../slicers/tripSlice";
import { useSaveFuelLevelMutation } from "../../slicers/fuelSlice";
import { useFetchSingleProfileQuery } from "../../slicers/authSlice";

import './SingleTripScreen.css';

const SingleTripScreen = () => {
    const tripId = useParams().id;

    const [singleTrip, setSingleTrip] = useState({});
    const [isDriver, setIsDriver] = useState(false);
    const [fuelLevel,setFuelLevel] = useState(0);
    const [reason,setReason] = useState('');

    const { data: userData, isLoading: userIsLoading, refetch , error: userError } = useFetchSingleProfileQuery();
    const { data: singleTripData, isLoading: singleTripIsLoading, error: singleTripError } = useFetchSingleTripQuery(tripId);
    const [ startTrip, { isLoading: startTripIsLoading }] = useStartTripMutation();
    const [ tripEnd, { isLoading: tripEndIsLoading }] = useTripEndMutation();
    const [ saveFuelLevel, { isLoading: saveFuelLevelIsLoading }] = useSaveFuelLevelMutation();
    const [ tripStopStart, { isLoading: tripStopStartIsLoading } ] = useTripStopStartMutation();
    const [ tripStopEnd, { isLoading: tripStopEndIsLoading }] = useTripStopEndMutation();
    const [ saveTripLocation, { isLoading: saveLocationIsLoading }] = useSaveTripLocationMutation();

    useEffect(() => {
        if(singleTripData && singleTripData?.trip){
            setSingleTrip(singleTripData?.trip);
        }

        if(userData && userData?.userProfile?.userType === 'Driver'){
            setIsDriver(true)
        }
    }, [singleTripData, userData]);

    const routeMapImageUrl = (originLat, originLng, destinationLat, destinationLng) => {
        const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
        const size = '600x400';
        const origin = `${originLat},${originLng}`;
        const destination = `${destinationLat},${destinationLng}`;
        const path = `path=color:0x0000ff|weight:5|${origin}|${destination}`;
        const markers = `markers=color:green|label:A|${origin}&markers=color:red|label:B|${destination}`;
        const url = `https://maps.googleapis.com/maps/api/staticmap?size=${size}&${path}&${markers}&key=${apiKey}`;

        return `https://maps.googleapis.com/maps/api/staticmap?size=${size}&markers=color:green|label:A|${origin}&markers=color:red|label:B|${destination}&path=enc:YOUR_ENCODED_POLYLINE&key=${apiKey}`;
    };

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

    const startTripHandler = async () => {
        try{
            const res = await saveFuelLevel({
                vehicleId: singleTrip?.vehicleId,
                currentLevel: fuelLevel.toString() + "%",
                location: {
                    latitude: singleTrip?.startLocation?.latitude,
                    longitude: singleTrip?.startLocation?.longitude,
                    address: singleTrip?.startLocation?.address
                }
            }).unwrap();
            message.success(res?.message);

            const res2 = await startTrip(tripId).unwrap();
            message.success(res2?.message);

            await refetch();

        }catch (error){
            console.log(error);
            message.error(error?.data?.message);
        }
    }

    const endTripHandler = async () => {
        try {
            const res = await saveFuelLevel({
                vehicleId: singleTrip?.vehicleId,
                currentLevel: fuelLevel.toString() + "%",
                location: {
                    latitude: singleTrip?.startLocation?.latitude,
                    longitude: singleTrip?.startLocation?.longitude,
                    address: singleTrip?.startLocation?.address
                }
            }).unwrap();
            message.success(res?.message);

            const res2 = await tripEnd(tripId).unwrap();
            message.success(res2?.message);

            await refetch();

        }catch (error){
            console.log(error);
            message.error(error?.data?.message);
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

    const startVehicleStopHandler = async () => {
        try{
            const { latitude, longitude } = await getCurrentLocation();
            const address = await getAddressFromCoordinates(latitude, longitude);

            const data = {
                stopLocation: {
                    latitude: latitude,
                    longitude: longitude,
                    address: address
                },
                reason: reason
            };
            let id = tripId;

            const res = await tripStopStart({id, data}).unwrap();

            message.success(res?.message);
            await refetch();

        }catch (error){
            console.log(error);
            message.error(error?.data?.message);
        }
    }

    const endVehicleStopHandler = async () => {
        try{
            const res = await tripStopEnd(tripId).unwrap();
            message.success(res?.message);
            await refetch();
        }catch (error){
            console.log(error);
            message.error(error?.data?.message);
        }
    }

    const changeFuelLevelHandler = (e) => {
        setFuelLevel(e.target.value);
    }

    const changeStopReasonHandler = (e) => {
        setReason(e.target.value);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            saveCurrentLocationHandler();
        }, 10 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    const saveCurrentLocationHandler = async () => {
        try{
            const { latitude, longitude } = await getCurrentLocation();
            const address = await getAddressFromCoordinates(latitude, longitude);

            const res = await saveTripLocation({
                latitude: latitude,
                longitude: longitude,
                address: address
            }).unwrap();
            message.success(res?.message);
        }catch (error){
            console.log(error);
            message.error(error?.data?.message);
        }
    }

    if(singleTripIsLoading || userIsLoading || startTripIsLoading || tripEndIsLoading || saveFuelLevelIsLoading ||
        tripStopStartIsLoading || tripStopEndIsLoading || saveLocationIsLoading){
        return (
            <div className={'loading-container'}>
                <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}}
                           wrapperClass="color-ring-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
            </div>
        )
    }else {
        return(
            <div className={'single-trip-screen'}>
                <div className={'single-trip-screen-container'}>
                    <img
                        src={routeMapImageUrl(singleTrip?.startLocation?.latitude, singleTrip?.startLocation?.longitude,
                            singleTrip?.endLocation?.latitude, singleTrip?.endLocation?.longitude)}/>
                    <div className={'single-trip-screen-box'}>
                        <p className={'single-trip-screen-box-title'}>Trip Id</p>
                        <p className={'single-driver-screen-box-desc'}>{singleTrip?.id}</p>
                    </div>
                    <div className={'single-trip-screen-box'}>
                        <p className={'single-trip-screen-box-title'}>Vehicle Identity Number</p>
                        <p className={'single-driver-screen-box-desc'}>{singleTrip?.vehicleVIN}</p>
                    </div>
                    <div className={'single-trip-screen-box'}>
                        <p className={'single-trip-screen-box-title'}>Vehicle Details</p>
                        <p className={'single-driver-screen-box-desc'}>{singleTrip?.vehicleDetail}</p>
                    </div>
                    <div className={'single-trip-screen-box'}>
                        <p className={'single-trip-screen-box-title'}>Driver's Name</p>
                        <p className={'single-driver-screen-box-desc'}>{singleTrip?.driverName}</p>
                    </div>
                    <div className={'single-trip-screen-box'}>
                        <p className={'single-trip-screen-box-title'}>Driver's Licence Number</p>
                        <p className={'single-driver-screen-box-desc'}>{singleTrip?.driverLicenceNumber}</p>
                    </div>
                    <div className={'single-trip-screen-box'}>
                        <p className={'single-trip-screen-box-title'}>Trip Start Time</p>
                        <p className={'single-driver-screen-box-desc'}>{singleTrip?.startTime}</p>
                    </div>
                    <div className={'single-trip-screen-box'}>
                        <p className={'single-trip-screen-box-title'}>Trip End Time</p>
                        <p className={'single-driver-screen-box-desc'}>{singleTrip?.endTime}</p>
                    </div>
                    <div className={'single-trip-screen-box'}>
                        <p className={'single-trip-screen-box-title'}>Trip Start Location</p>
                        <p className={'single-driver-screen-box-desc'}>{singleTrip?.startLocation?.address}</p>
                    </div>
                    <div className={'single-trip-screen-box'}>
                        <p className={'single-trip-screen-box-title'}>Trip End Time</p>
                        <p className={'single-driver-screen-box-desc'}>{singleTrip?.endLocation?.address}</p>
                    </div>
                    <p className={'single-trip-screen-sub-title'}>Trip Stops</p>
                    <table className={'single-trip-screen-table'}>
                        <thead>
                            <tr>
                                <th className={'single-trip-screen-table-header'}>Address</th>
                                <th className={'single-trip-screen-table-header'}>Start Time</th>
                                <th className={'single-trip-screen-table-header'}>End Time</th>
                                <th className={'single-trip-screen-table-header'}>Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {singleTrip?.tripStops && singleTrip?.tripStops.map((tripStop, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={'single-trip-screen-table-data'}>{tripStop?.location?.address}</td>
                                        <td className={'single-trip-screen-table-data'}>{tripStop?.startTime}</td>
                                        <td className={'single-trip-screen-table-data'}>{tripStop?.endTime}</td>
                                        <td className={'single-trip-screen-table-data'}>{tripStop?.reason}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <p className={'single-trip-screen-sub-title'}>Certifications</p>
                    {singleTrip?.tripCertifications && singleTrip?.tripCertifications.map((certification, index) => {
                        return(
                            <div className={'single-trip-screen-box'} key={index}>
                                <p className={'single-trip-screen-box-title'}>{certification?.certificateType}</p>
                                <span key={index} className={'single-driver-screen-box-desc'}>
                                <a href={certification?.certificate} download={certification?.certificate} target="_blank">
                                    Document {index + 1}
                                </a>
                            </span>
                            </div>
                        )
                    })}

                    {isDriver && <div>
                        <>
                            <CustomInput title={'Enter Fuel Level'} value={fuelLevel} id={'fuelLevel'}
                                         placeholder={'Enter Fuel Level'} onChangeHandle={changeFuelLevelHandler} type={'number'}
                                         errorMessage={''} isError={false}/>
                            <div className={'single-trip-screen-button-container'}>
                                {!singleTrip?.startTime &&
                                    <CustomButton title={'Start Trip'} isSmall={true} fontColor={'#f0f0f0'} bgColor={'transparent'}
                                                  onClick={startTripHandler}/>}
                                {(!singleTrip?.endTime && singleTrip?.startTime) &&
                                    <CustomButton title={'End Trip'} isSmall={true} fontColor={'#f0f0f0'} bgColor={'transparent'}
                                                  onClick={endTripHandler}/>}
                            </div>
                        </>
                        {(!singleTrip?.endTime && singleTrip?.startTime) && <>
                            <CustomInput title={'Enter Vehicle Stop Reason'} value={reason} id={'stopReason'}
                                         placeholder={'Enter Vehicle Stop Reason'} onChangeHandle={changeStopReasonHandler}
                                         type={'text'} errorMessage={''} isError={false}/>
                            <div className={'single-trip-screen-button-container-2'}>
                                <CustomButton title={'Start Vehicle Stop'} isSmall={true} fontColor={'#f0f0f0'}
                                              bgColor={'transparent'} onClick={startVehicleStopHandler}/>
                                <CustomButton title={'End Vehicle Stop'} isSmall={true} fontColor={'#f0f0f0'}
                                              bgColor={'transparent'} onClick={endVehicleStopHandler}/>
                            </div>
                        </>}
                    </div>}
                </div>
            </div>
        )
    }
}

export default SingleTripScreen;