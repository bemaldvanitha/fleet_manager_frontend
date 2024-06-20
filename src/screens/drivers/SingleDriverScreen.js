import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { useGetSingleDriverQuery } from "../../slicers/driverSlice";

import './SingleDriverScreen.css';

const SingleDriverScreen = () => {
    const id = useParams().id;
    const [singleDriver, setSingleDriver] = useState({});

    const { data: singleDriverData, isLoading, fetchSingleDriverIsLoading, error: singleDriverError } = useGetSingleDriverQuery(id);

    useEffect(() => {
        if(singleDriverData && singleDriverData?.driver){
            setSingleDriver(singleDriverData?.driver);
        }
    }, [singleDriverData]);

    return(
        <div className={'single-driver-screen'}>
            <div className={'single-driver-screen-container'}>
                <p className={'single-driver-screen-title'}>{singleDriver?.firstName} {singleDriver?.lastName}</p>
                <div className={'single-driver-screen-box'}>
                    <p className={'single-driver-screen-box-title'}>Licence Number</p>
                    <p className={'single-driver-screen-box-desc'}>{singleDriver?.licenceNumber}</p>
                </div>
                <div className={'single-driver-screen-box'}>
                    <p className={'single-driver-screen-box-title'}>Status</p>
                    <p className={'single-driver-screen-box-desc'}>{singleDriver?.status}</p>
                </div>
                <p className={'single-driver-screen-sub-title'}>Certifications</p>
                {singleDriver?.certificates && singleDriver?.certificates.map((certificate, index) => {
                    return(
                        <div key={index} className={'single-driver-screen-box'}>
                            <p className={'single-driver-screen-box-title'}>{certificate?.certificationType}</p>
                            <span key={index} className={'project-detail-document-box'}>
                                <a href={certificate?.certificate} download={certificate?.certificate} target="_blank">
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

export default SingleDriverScreen;