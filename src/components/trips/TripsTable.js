import React from 'react';
import { FaInfo, FaTrash } from "react-icons/fa";

import './TripsTable.css';

const TripsTable = ({ trips, cancelTrip }) => {
    return(
        <table className={'trip-table'}>
            <thead>
                <tr className={'trip-table-header-row'}>
                    <th className={'trip-table-header'}>Id</th>
                    <th className={'trip-table-header'}>Driver's Name</th>
                    <th className={'trip-table-header'}>VIN</th>
                    <th className={'trip-table-header'}>Start Location</th>
                    <th className={'trip-table-header'}>End Location</th>
                    <th className={'trip-table-header'}>Trip Status</th>
                    <th className={'trip-table-header'}>Action</th>
                </tr>
            </thead>
            <tbody>
                {trips && trips.map((trip, index) => {
                    return(
                        <tr key={index} className={'trip-table-row'}>
                            <td className={'trip-table-data'}>{trip?.id}</td>
                            <td className={'trip-table-data'}>{trip?.driverName}</td>
                            <td className={'trip-table-data'}>{trip?.vehicleVIN}</td>
                            <td className={'trip-table-data'}>{trip?.startLocation}</td>
                            <td className={'trip-table-data'}>{trip?.endLocation}</td>
                            <td className={'trip-table-data'}>{trip?.tripStatus}</td>
                            <div className={'trip-table-icon-container'}>
                                <FaInfo className={'trip-table-icon trip-table-info-icon'} onClick={() =>
                                    {}}/>
                                <FaTrash className={'trip-table-icon trip-table-delete-icon'} onClick={() =>
                                    cancelTrip(trip?.id)}/>
                            </div>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TripsTable;