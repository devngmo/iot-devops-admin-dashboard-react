import './Dashboard.css';
import Button from 'react-bootstrap/Button';

function showTenants() {
    window.location.href = '/tenants/listing';
}

function showTenantsSettings() {
    window.location.href = '/tenants/settings';
}

export default function Dashboard() {
    return (
        <div>
            <div>Dashboard</div>
            <ul className='list-group'>
                <li className='list-group-item d-grid gap-2'>
                    <Button sz='lg' as="a" variant="primary" onClick={showTenants}>Tenants</Button>
                </li>
                <li className='list-group-item d-grid gap-2'>
                    <Button sz='lg' as="a" variant="primary" onClick={showTenantsSettings}>Tenants Settings</Button>
                </li>
            </ul>
        </div>
    );
}