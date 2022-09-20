export default class TriggerAPI {
    constructor() {
        this.endpoint = 'http://127.0.0.1:24105';
    }
    
    testTrigger(device_id, timepointData) {
        console.log(`test trigger ${device_id}`);
        console.log(JSON.stringify(timepointData));
        return fetch(`${this.endpoint}/api/v1/device/${device_id}`, 
            {
                method:'POST', 
                headers:{'Content-Type': 'application/json', 'ignore_log_history':'0'}, 
                body: JSON.stringify(timepointData)
            }
        );
    }

}