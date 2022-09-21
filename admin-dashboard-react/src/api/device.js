export default class DeviceAPI {
    constructor() {
        this.endpoint = 'http://127.0.0.1:24101';
    }
    
    getTenantDevices(tenant_id, include_triggers) {
        return fetch(`${this.endpoint}/api/v1/core/devices`, 
        {
            method:'GET', 
            headers:{
                'tenant_id': tenant_id, 
                'Content-Type': 'application/json',
                'include_triggers': include_triggers
            }
        });
    }

    addSampleTrigger(tenant_id, device_id) {
        return fetch(`${this.endpoint}/api/v1/core/trigger/generate/sample`, 
        {
            method:'POST', 
            headers:{
                'tenant_id': tenant_id, 
                'Content-Type': 'application/json',
            },
            body: { 'device_id': device_id }
        });
    }

}