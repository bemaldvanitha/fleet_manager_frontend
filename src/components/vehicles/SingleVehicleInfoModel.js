import React from 'react';
import { Modal } from "antd";

import './SingleVehicleInfoModel.css';

const SingleVehicleInfoModel = ({ visibility, closeModel, data, location }) => {

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
        </Modal>
    )
}

export default SingleVehicleInfoModel;