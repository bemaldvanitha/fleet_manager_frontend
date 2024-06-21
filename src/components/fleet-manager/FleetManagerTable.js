import React from 'react';

import './FleetManagerTable.css';

const FleetManagerTable = ({ fleetManagers }) => {
    return(
        <table className={'fleet-manager-table'}>
            <thead>
                <tr className={'drivers-table-header-row'}>
                    <th className={'fleet-manager-table-header'}>Id</th>
                    <th className={'fleet-manager-table-header'}>Name</th>
                    <th className={'fleet-manager-table-header'}>Email</th>
                    <th className={'fleet-manager-table-header'}>Mobile Number</th>
                </tr>
            </thead>
            <tbody>
                {fleetManagers && fleetManagers.map((manager, index) => {
                    return <tr key={index}>
                        <td className={'fleet-manager-table-data'}>{manager?.id}</td>
                        <td className={'fleet-manager-table-data'}>{manager?.name}</td>
                        <td className={'fleet-manager-table-data'}>{manager?.email}</td>
                        <td className={'fleet-manager-table-data'}>{manager?.mobileNumber}</td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default FleetManagerTable;