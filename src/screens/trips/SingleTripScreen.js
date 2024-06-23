import React, { useState, useEffect } from 'react';
import { ColorRing } from "react-loader-spinner";
import { useParams } from "react-router-dom";

import { useFetchSingleTripQuery, useStartTripMutation, useTripEndMutation, useTripStopStartMutation, useTripStopEndMutation,
    useSaveTripLocationMutation } from "../../slicers/tripSlice";

import './SingleTripScreen.css';


const SingleTripScreen = () => {
    const tripId = useParams().id;

    const [singleTrip, setSingleTrip] = useState({});

    const { data: singleTripData, isLoading: singleTripIsLoading, error: singleTripError } = useFetchSingleTripQuery(tripId);

    useEffect(() => {
        if(singleTripData && singleTripData?.trip){
            setSingleTrip(singleTripData?.trip);
        }
    }, [singleTripData]);

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


    if(singleTripIsLoading){
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
                </div>
            </div>
        )
    }
}

export default SingleTripScreen;