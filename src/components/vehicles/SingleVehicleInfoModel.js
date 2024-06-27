import React from 'react';
import { Modal } from "antd";

import './SingleVehicleInfoModel.css';

const SingleVehicleInfoModel = ({ visibility, closeModel, data, location, fuelRefills, fuelLevels, vehicleMaintenances }) => {

    const mapImageUrl = () => {
        const latitude = location?.latitude;
        const longitude = location?.longitude;
        const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
        const zoom = 15;
        const size = '350x250';
        const markers = `markers=color:red|label:A|${latitude},${longitude}`;
        return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${size}&${markers}&key=${apiKey}`;
    };

    return(
        <Modal title="Single Vehicle Info" open={visibility} onOk={closeModel} onCancel={closeModel} footer={null}
               className={'custom-model'} okButtonProps={{className: 'custom-model-ok-button'}}>
            <div className={'single-vehicle-info-box'}>
                <p className={'single-vehicle-info-box-title'}>Vehicle Brand</p>
                <p className={'single-vehicle-info-box-desc'}>{data?.brand}</p>
            </div>
            <div className={'single-vehicle-info-box'}>
                <p className={'single-vehicle-info-box-title'}>Vehicle Model</p>
                <p className={'single-vehicle-info-box-desc'}>{data?.model}</p>
            </div>
            <div className={'single-vehicle-info-box'}>
                <p className={'single-vehicle-info-box-title'}>Vehicle Registration Number</p>
                <p className={'single-vehicle-info-box-desc'}>{data?.registrationNumber}</p>
            </div>
            <div className={'single-vehicle-info-box'}>
                <p className={'single-vehicle-info-box-title'}>Vehicle VIN</p>
                <p className={'single-vehicle-info-box-desc'}>{data?.vin}</p>
            </div>
            <div className={'single-vehicle-info-box'}>
                <p className={'single-vehicle-info-box-title'}>Vehicle Manufactured At</p>
                <p className={'single-vehicle-info-box-desc'}>{data?.manufacturedAt}</p>
            </div>
            <div className={'single-vehicle-info-box'}>
                <p className={'single-vehicle-info-box-title'}>Vehicle Purchased At</p>
                <p className={'single-vehicle-info-box-desc'}>{data?.purchasedAt}</p>
            </div>
            <div className={'single-vehicle-all-certifications'}>
                {data?.vehicleCertificates && data?.vehicleCertificates.map((certificate, index) => {
                    return (
                        <div key={index} className={'single-vehicle-info-box'}>
                            <p className={'single-vehicle-info-box-title'}>{certificate?.certificateType}</p>
                            <span key={index} className={'single-vehicle-info-box'}>
                                <a href={certificate?.certificate} download={certificate?.certificate} target="_blank">
                                    Document {index + 1}
                                </a>
                            </span>
                        </div>
                    )
                })}
            </div>
            <img alt={'map-image'} src={mapImageUrl()}/>
            <div className={'single-vehicle-info-box'}>
                <p className={'single-vehicle-info-box-title'}>Location</p>
                <p className={'single-vehicle-info-box-desc'}>{location?.address}</p>
            </div>
            <table className={'single-vehicle-screen-table'}>
                <thead>
                <tr>
                    <th className={'single-vehicle-screen-table-header'}>Fuel Amount</th>
                    <th className={'single-vehicle-screen-table-header'}>Fuel Cost</th>
                    <th className={'single-vehicle-screen-table-header'}>Address</th>
                </tr>
                </thead>
                <tbody>
                {fuelRefills && fuelRefills.map((refill, index) => {
                    return (
                        <tr key={index}>
                            <td className={'single-vehicle-table-data'}>{refill?.fuelAmount}</td>
                            <td className={'single-vehicle-table-data'}>{refill?.cost}</td>
                            <td className={'single-vehicle-table-data'}>{refill?.location?.address}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <table className={'single-vehicle-screen-table'}>
                <thead>
                <tr>
                    <th className={'single-vehicle-screen-table-header'}>Fuel Level</th>
                    <th className={'single-vehicle-screen-table-header'}>Address</th>
                </tr>
                </thead>
                <tbody>
                {fuelLevels && fuelLevels.map((level, index) => {
                    return (
                        <tr key={index}>
                            <td className={'single-vehicle-table-data'}>{level?.currentLevel}</td>
                            <td className={'single-vehicle-table-data'}>{level?.location?.address}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <table className={'single-vehicle-screen-table'}>
                <thead>
                    <tr>
                        <th className={'single-vehicle-screen-table-header'}>Maintenance Type</th>
                        <th className={'single-vehicle-screen-table-header'}>Total Cost</th>
                        <th className={'single-vehicle-screen-table-header'}>Is Regular</th>
                        <th className={'single-vehicle-screen-table-header'}>Vehicle Parts</th>
                    </tr>
                </thead>
                <tbody>
                {vehicleMaintenances && vehicleMaintenances.map((maintenance, index) => {
                    return (
                        <tr key={index}>
                            <td className={'single-vehicle-table-data'}>{maintenance?.maintenanceType}</td>
                            <td className={'single-vehicle-table-data'}>{maintenance?.totalCost}</td>
                            <td className={'single-vehicle-table-data'}>{maintenance?.isRegular}</td>
                            <td className={'single-vehicle-table-data'}>{maintenance?.maintenanceParts &&
                                maintenance.maintenanceParts.map((part, idx) => <span>{part?.partName}</span>)}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </Modal>
    )
}

export default SingleVehicleInfoModel;