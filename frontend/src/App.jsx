import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import Income from './Pages/Income';
import Expense from './Pages/Expense';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import CustomizeCategory from './Components/CustomizeCategory';
import Logout from './Pages/Logout';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './Components/NotFound';
import LandingPage from './Pages/LandingPage';
import 'aos/dist/aos.css'; // Import the CSS
import AOS from 'aos';
AOS.init(); 


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <ToastContainer />

      <Router>
        <Routes>
          {loggedIn ? <Route path='/dashboard' element={<Dashboard />}></Route> :
            <Route path='/' element={<Login />}></Route>
          }
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
          <Route path='/help' element={<Help />}></Route>
          <Route path='/logout' element={<Logout />}></Route>
          <Route path='/customize-category' element={<CustomizeCategory />}></Route>
          <Route path='/edit-profile' element={<EditProfile />}></Route>
          <Route path='/success-changed-pass' element={<PassSuccess />}></Route>
          <Route path='/landing-page' element={<LandingPage />}></Route>
          <Route path="*" element={<NotFound />} />

        </Routes>

      </Router>
    </>
  );
}

export default App;
