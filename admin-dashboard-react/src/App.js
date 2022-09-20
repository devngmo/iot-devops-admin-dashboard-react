import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TenantsSettings from './components/tenants/TenantsSettings/TenantsSettings';
import TenantListing from './components/tenants/TenantListing/TenantListing';
import 'bootstrap/dist/css/bootstrap.min.css';
import TenantDetail from './components/tenant/TenantDetail';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/tenants/settings" element={<TenantsSettings/>}></Route>
          <Route path="/tenants/listing" element={<TenantListing/>}></Route>
          <Route path="/tenant/:id" element={<TenantDetail/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
