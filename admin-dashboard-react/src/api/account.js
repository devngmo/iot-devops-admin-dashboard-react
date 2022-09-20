export default class AccountAPI {
    constructor() {
        this.endpoint = 'http://127.0.0.1:24101';
    }
    
    getAllTenants() {
        return fetch(`${this.endpoint}/api/v1/core/tenants`, {method:'GET'});
    }

    applyTTSConfigForAllTenants(tts) {
        return fetch(`${this.endpoint}/api/v1/devops/accounts/update/tts`, {method:'POST', headers: {'Content-Type': 'application/json'}, body: tts});
    }

    getTenantByID(tenant_id) {
        return fetch(`${this.endpoint}/api/v1/core/tenant/${tenant_id}`, {method:'GET'});
    }
}