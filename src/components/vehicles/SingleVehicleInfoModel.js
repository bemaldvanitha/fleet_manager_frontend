import React from 'react';
import { Modal } from "antd";

import './SingleVehicleInfoModel.css';

const SingleVehicleInfoModel = ({ visibility, closeModel, data }) => {
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
                    return(
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
        </Modal>
    )
}

export default SingleVehicleInfoModel;