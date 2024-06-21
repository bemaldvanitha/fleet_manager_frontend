import React from 'react';
import { FaEdit, FaInfo, FaTrash } from "react-icons/fa";

import CustomSwitch from "../common/CustomSwitch";

import './VehiclesTable.css';

const VehiclesTable = ({ vehicles, changeAvailability, removeVehicle }) => {
    return(
        <table className={'vehicle-table'}>
            <thead>
                <tr className={'vehicle-table-header-row'}>
                    <th className={'vehicle-table-header'}>Id</th>
                    <th className={'vehicle-table-header'}>Brand</th>
                    <th className={'vehicle-table-header'}>Model</th>
                    <th className={'vehicle-table-header'}>VIN</th>
                    <th className={'vehicle-table-header'}>Status</th>
                    <th className={'vehicle-table-header'}>Action</th>
                </tr>
            </thead>
            <tbody>
            {vehicles && vehicles.map((vehicle, index) => {
                return (
                    <tr key={index} className={'vehicle-table-row'}>
                        <td className={'vehicle-table-data'}>{vehicle?.id}</td>
                        <td className={'vehicle-table-data'}>{vehicle?.brand}</td>
                        <td className={'vehicle-table-data'}>{vehicle?.model}</td>
                        <td className={'vehicle-table-data'}>{vehicle?.vin}</td>
                        <td>
                            <CustomSwitch checked={vehicle?.status === 'Available'} changeHandler={() => changeAvailability(vehicle?.id)}/>
                        </td>
                        <div className={'vehicle-table-icon-container'}>
                            <FaInfo className={'vehicle-table-icon vehicle-table-info-icon'} onClick={() => {}}/>
                            <FaEdit className={'vehicle-table-icon vehicle-table-edit-icon'} onClick={() =>
                                {}}/>
                            <FaTrash className={'vehicle-table-icon vehicle-table-delete-icon'} onClick={() =>
                                removeVehicle(vehicle?.id)}/>
                        </div>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default VehiclesTable;