import React from "react";

import './MaintenanceTable.css';

const MaintenanceTable = ({ maintenances }) => {
    return (
        <table className={'maintenance-table'}>
            <thead>
                <tr className={'maintenance-table-header-row'}>
                    <th className={'maintenance-table-header'}>Id</th>
                    <th className={'maintenance-table-header'}>Maintenance Type</th>
                    <th className={'maintenance-table-header'}>Is Regular</th>
                    <th className={'maintenance-table-header'}>Total Cost</th>
                    <th className={'maintenance-table-header'}>Parts</th>
                </tr>
            </thead>
            <tbody>
                {maintenances && maintenances.map((maintenance, index) => {
                    return (
                        <tr className={'maintenance-table-row'} key={index}>
                            <td className={'maintenance-table-data'}>{maintenance?.id}</td>
                            <td className={'maintenance-table-data'}>{maintenance?.maintenanceType}</td>
                            <td className={'maintenance-table-data'}>{maintenance?.isRegular.toString()}</td>
                            <td className={'maintenance-table-data'}>{maintenance?.totalCost}</td>
                            <td className={'maintenance-table-data'}>
                                {maintenance?.maintenanceParts && maintenance?.maintenanceParts.map((part, idx) => <span key={idx}>
                                    {part?.partName} /
                                </span>)}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default MaintenanceTable;