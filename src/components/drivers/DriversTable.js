import React from 'react';
import { FaEdit, FaTrash, FaInfo } from "react-icons/fa";

import CustomSwitch from "../common/CustomSwitch";

import './DriversTable.css';

const DriversTable = ({ drivers, changeStatus, deleteHandler }) => {
    return(
        <table className={'drivers-table'}>
            <thead>
                <tr className={'drivers-table-header-row'}>
                    <th className={'drivers-table-header'}>ID</th>
                    <th className={'drivers-table-header'}>Name</th>
                    <th className={'drivers-table-header'}>Mobile Number</th>
                    <th className={'drivers-table-header'}>status</th>
                    <th className={'drivers-table-header'}>Driver's Licence</th>
                    <th className={'drivers-table-header'}>Action</th>
                </tr>
            </thead>
            <tbody>
            {drivers.map((driver, index) => {
                    return(
                        <tr key={index} className={'drivers-table-row'}>
                            <td className={'drivers-table-data'}>{driver?.id}</td>
                            <td className={'drivers-table-data'}>{driver?.firstName} {driver?.lastName}</td>
                            <td className={'drivers-table-data'}>{driver?.mobileNumber}</td>
                            <CustomSwitch checked={driver?.status === 'Available'} changeHandler={() => changeStatus(driver?.id)}/>
                            <td className={'drivers-table-data'}>{driver?.licenceNumber}</td>
                            <div className={'drivers-table-icon-container'}>
                                <FaInfo className={'drivers-table-icon drivers-table-info-icon'} onClick={() => {}}/>
                                <FaEdit className={'drivers-table-icon drivers-table-edit-icon'} onClick={() => {}}/>
                                <FaTrash className={'drivers-table-icon drivers-table-delete-icon'} onClick={() =>
                                    deleteHandler(driver?.id)}/>
                            </div>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default DriversTable;