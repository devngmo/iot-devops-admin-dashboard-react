import { Button } from 'react-bootstrap';
import './TenantsSettings.css';
import AccountAPI from '../../../api/account';


const ttsConfig = `
{
    "appid":"demo-app-iot",
    "token":"NNSXS.6EEXPOYKMECURVOHRCFNNJIID2LQPVAQ4MUILNA.MZ4GPBMKY72X5V3FM2GSIK5OGF3SFLLFWP6S4OIT7RVOBIQZGH7Q",
    "endpoint":"https://cloud.odm-iot.com"
}
`;

function applyTTSConfigForAllTenants() {
    new AccountAPI().applyTTSConfigForAllTenants(ttsConfig)
    .then((resp) => resp.json())
    .then((result) => console.log(result))
    ;
}

function renderTTSSection() {

    return <div className='section'>
        <div className='section-header'>TTS Settings</div>
        <div className='section-body'>
            <textarea maxLength={1000} rows={6} defaultValue={ttsConfig}>
                
            </textarea>
            <div>
                <Button onClick={applyTTSConfigForAllTenants}>Apply</Button>
            </div>
        </div>

    </div>
}


function TenantsSettings() {
    return (
        <div>
            <div>Tenants Settings</div>
            {renderTTSSection()}
        </div>
    );
}

export default TenantsSettings;
