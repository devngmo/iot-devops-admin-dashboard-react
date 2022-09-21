import { Button } from 'react-bootstrap';
import DeviceAPI from '../../../api/device';
import TriggerListing from '../TriggerListing/TriggerListing';
import './DeviceDetail.css';


function addSampleTrigger(tenant_id, device) {
    new DeviceAPI().addSampleTrigger(tenant_id, device._id);
}

export default function DeviceDetail(props) {
    let header = <div>No device selected</div>;
    let deviceInfo = <div>No device selected</div>;
    let triggers = <div></div>;
    let triggerSectionLabel = 'Triggers';


    if (props.device !== undefined && props.device !== null) {
        triggerSectionLabel = `${props.device.triggers.length} Triggers`;
        header = <b>[{props.device._id}] {props.device.basicParams.name}</b>;
        deviceInfo = <div className='section-body'>
            <div>ID: {props.device._id}</div>
            <div>Name: {props.device.basicParams.name}</div>
        </div>
        triggers = <TriggerListing isLoading={false} triggers={props.device.triggers}></TriggerListing>;
    }
    return <div className='section device-detail'>
        <div className='section-header lv-0'>{header}</div>
        <div className='section-body'>
            <div className='section device-info'>
                <div className='section-header lv-1 info'>Info</div>
                {deviceInfo}
            </div>
            <div className='section triggers'>
                <div className='section-header lv-1 triggers'>
                    <div className='f1'>{triggerSectionLabel}</div>
                    <div><Button onClick={() => addSampleTrigger(props.tenant_id, props.device)}>Add</Button></div>
                </div>
                {triggers}
            </div>
        </div>
    </div>
}