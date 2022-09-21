import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AccountAPI from '../../api/account';
import DeviceAPI from '../../api/device';
import './TenantDetail.css';
import { Button } from 'react-bootstrap';
import TriggerAPI from '../../api/trigger';
import DeviceListing from '../widgets/DeviceListing/DeviceListing';
import DeviceDetail from '../widgets/DeviceDetail/DeviceDetail';

const deviceParamMapping = {};

function createTimepoint(device_id, params) {
    return {
        'device_id': device_id,
        'tts_time': new Date().toISOString(),
        'cloud_time': new Date().toISOString(),
        'parameters': params
    };
}


function testTriggerOnDevice(device_id) {
    let params = deviceParamMapping[device_id];
    console.log(`TenantDetail: test trigger on device ${device_id}`);
    console.log(params);

    new TriggerAPI().testTrigger(
        device_id, 
        createTimepoint(device_id, params)
    );
}

function onParamChanged(device_id, ev) {
    console.log(ev.target.value);
    deviceParamMapping[device_id] = JSON.parse(ev.target.value);
    console.log(device_id);    
}

function renderDeviceList(devices) {
    let rows = [];
    let portParams = {};

    devices.forEach(d => {
        let portRows = [];
        let triggerRows = [];
        d.ports.forEach(p => {
            portParams[p.id] = 0;
            portRows.push( <div key={p.id}><b>[{p.id}]</b> {p.name}</div> );
        });
        d.triggers.forEach(t => {
            triggerRows.push( <div key={t.id}><b>[{t._id}]</b> {t.name}</div> );
        });

        if (deviceParamMapping[d._id] === undefined) {
            deviceParamMapping[d._id] = portParams;
            console.log(`init device param ${d._id}`);
        }

        rows.push(<li className='list-group-item card' key={d._id}>
            <div className='card-header'>{d._id}: {d.basicParams.name}</div>
            <div className='card-body'>
                <label><b>PORTS</b></label>
                <div> { portRows }</div>
                <label><b>TRIGGERS</b></label>
                <div> { triggerRows }</div>
                <textarea 
                rows={5} 
                defaultValue={JSON.stringify(portParams, null, '  ')}
                onChange={(ev) => onParamChanged(d._id, ev) }
                ></textarea>
                <div>
                    <Button onClick={() => { testTriggerOnDevice(d._id) }}>Test Trigger</Button>
                </div>
            </div>
        </li>);
    });
    return <ul className='list-group'>{rows}</ul>;
}

export default function TenantDetail(props) {
    const {id} = useParams();
    const [tenant, setTenant] = useState(null);
    const [devices, setDevices] = useState([]);
    const [loadingDevices, setLoadingDevices] = useState(true);
    const [selectedDevice, setSelectedDevice] = useState(null);
    


    useEffect(() => {
        new AccountAPI().getTenantByID(id)
        .then((resp) => resp.json())
        .then((data) => {
            setTenant(data);
        })
        ;

        new DeviceAPI().getTenantDevices(id, '1')
        .then((resp) => {
            console.log(resp);
            return resp.json();
        })
        .then((data) => {
            console.log(data);
            setLoadingDevices(false);
            setDevices(data);
        })
        ;
    }, []);

    
    return <div className='screen tenant-detail hflex'>
        <div className='panel device-list-container'>
            <DeviceListing isLoading={loadingDevices} devices={devices} onChange={(d) => setSelectedDevice(d)}></DeviceListing>
        </div>
        <div className='panel device-detail-container f1'>
            <DeviceDetail tenant_id={id} device={selectedDevice}></DeviceDetail>
        </div>
    </div>
}