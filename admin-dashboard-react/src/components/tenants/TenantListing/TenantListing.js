import './TenantListing.css';
import AccountAPI from  '../../../api/account';
import { useState, useEffect } from 'react';

function showTenantDetail(tenant_id) {
    window.location.href = `/tenant/${tenant_id}`;
}

export default function TenantListing() {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        new AccountAPI().getAllTenants()
        .then((resp) => resp.json())
        .then((data) => setTenants(data))
        ;
    }, []);

    const rows = [];
    for(var i = 0; i < tenants.length; i++) {
        let t = tenants[i];
        let tts = '';
        if ('tts' in t) {
            tts = <div>
                <div>{t.tts.endpoint}</div>
                <div>{t.tts.appid}</div>
                <div>{t.tts.token}</div>
            </div>;
        }
        let tenant_id = t._id;
        rows.push(<li className='list-group-item card acc-info' key={i} tenant_id={tenants[i]._id} onClick={() => showTenantDetail(tenant_id)}>
            {/* {JSON.stringify(tenants[i])} */}
            <div className='card-header'>{t._id}: {t.name}</div>
            <div className='card-body'>
                <div>
                    <span className='acc-email'>{t.email}</span>
                </div>
                <b><label>The Thing Stack</label></b>
                <div className='acc-tts'>{tts}</div>
            </div>
            
        </li>);
    }

    return (
<div>
    <div>All Tenants</div>
    <ul className='list-group'>
        {rows}
    </ul>
</div>
    );
}