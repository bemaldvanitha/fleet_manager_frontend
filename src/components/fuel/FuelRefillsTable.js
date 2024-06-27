import React from 'react';

import './FuelRefillsTable.css';

const FuelRefillsTable = ({ fuelRefills }) => {
    return(
        <table className={'fuel-refills-table'}>
            <thead>
                <tr className={'fuel-refills-table-header-row'}>
                    <th className={'fuel-refills-table-header'}>Fuel Amount</th>
                    <th className={'fuel-refills-table-header'}>Cost</th>
                    <th className={'fuel-refills-table-header'}>Location</th>
                </tr>
            </thead>
            <tbody>
                {fuelRefills && fuelRefills.map((refills, index) => {
                    return(
                        <tr key={index} className={'fuel-refills-table-row'}>
                            <td className={'fuel-refills-table-data'}>{refills?.fuelAmount} L</td>
                            <td className={'fuel-refills-table-data'}>Rs. {refills?.cost}</td>
                            <td className={'fuel-refills-table-data'}>{refills?.location?.address}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default FuelRefillsTable;