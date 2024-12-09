import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/auth/login/Login';
import SignUp from './pages/auth/signUp/SignUp';
import RegisterComapny from './pages/auth/signUp/RegisterComapny';
import ForgotPassword from './pages/auth/forgotPassword/ForgotPassword';
import ResetPassword from './pages/auth/forgotPassword/ResetPassword';
import ManagerDashboard from './pages/dashboard/manager/ManagerDashboard';
import WholesaleDashboard from './pages/dashboard/wholesale/WholesaleDashboard';
import RetailDashboard from './pages/dashboard/retail/RetailDashboard';
import StoreDashboard from './pages/dashboard/store/StoreDashboard';
import AbdallahDashboard from './pages/dashboard/company/abdallah/AbdallahDashboard';


function App() {
  return (
    <div className="App">
      <Switch>
        {/* auth */}
        <Route exact path="/" component={Login} />
        <Route path="/register" component={SignUp} />
        <Route path="/register-company" component={RegisterComapny} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />

        {/* dashboards */}
        <Route path='/manager-dashboard' component={ManagerDashboard} />
        <Route path='/wholesale-dashboard' component={WholesaleDashboard} />
        <Route path='/retail-dashboard' component={RetailDashboard} />
        <Route path='/store-dashboard' component={StoreDashboard} />
        <Route path='/abdallah-dashboard' component={AbdallahDashboard} />
      </Switch>
    </div>
  );
}

export default App;
