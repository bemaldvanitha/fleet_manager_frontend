import React from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";

import './DriversTable.css';

const DriversTable = ({ drivers }) => {
    return(
        <table className={'drivers-table'}>
            <thead>
                <tr>
                    <th className={'drivers-table-header'}>ID</th>
                    <th className={'drivers-table-header'}>Name</th>
                    <th className={'drivers-table-header'}>Mobile Number</th>
                    <th className={'drivers-table-header'}>Email</th>
                    <th className={'drivers-table-header'}>Driver's Licence</th>
                    <th className={'drivers-table-header'}>Action</th>
                </tr>
            </thead>
            <tbody>
            {drivers.map((driver, index) => {
                    return(
                        <tr key={index} className={'drivers-table-row'}>
                            <td className={'drivers-table-data'}>{driver?.id}</td>
                            <td className={'drivers-table-data'}>{driver?.name}</td>
                            <td className={'drivers-table-data'}>{driver?.mobileNumber}</td>
                            <td className={'drivers-table-data'}>{driver?.email}</td>
                            <td className={'drivers-table-data'}>{driver?.driverLicenceNumber}</td>
                            <div className={'drivers-table-icon-container'}>
                                <FaEdit className={'drivers-table-icon drivers-table-edit-icon'} onClick={() => {}}/>
                                <FaTrash className={'drivers-table-icon drivers-table-delete-icon'} onClick={() => {}}/>
                            </div>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default DriversTable;