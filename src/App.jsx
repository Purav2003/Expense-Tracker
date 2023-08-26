import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import Income from './Pages/Income';
import Expense from './Pages/Expense';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css'
import IncomeSearch from './Components/IncomeSearch';
import ExpenseSearch from './Components/ExpenseSearch';
import ResetPassword from './Components/ResetPassword';
import PassSuccess from './Components/PassSuccess';
import ForgetPassword from './Components/ForgetPassword';
import Profile from './Components/Profile';
import ForgetPasswordMail from './Components/ForgetPasswordMail';
import EditProfile from './Components/EditProfile';
import DashboardSearch from './Components/DashboardSearch';
import Settings from './Components/Settings';
import Help from './Components/Help';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/income' element={<Income />}></Route>
        <Route path='/expense' element={<Expense />}></Route>
        <Route path='/search-income' element={<IncomeSearch />}></Route>
        <Route path='/search-expense' element={<ExpenseSearch />}></Route>      
        <Route path='/search-dashboard' element={<DashboardSearch />}></Route>      
        <Route path='/reset-password' element={<ResetPassword />}></Route>      
        <Route path='/forget-password-mail' element={<ForgetPasswordMail />}></Route>      
        <Route path='/forget-password' element={<ForgetPassword />}></Route>      
        <Route path='/profile' element={<Profile />}></Route>      
        <Route path='/settings' element={<Settings />}></Route>      
        <Route path='/Help' element={<Help />}></Route>      
        <Route path='/edit-profile' element={<EditProfile />}></Route>      

    <Route path='/success-changed-pass' element={<PassSuccess />}></Route>
      </Routes>
       
    </Router>
    </>
    );
}

export default App;
