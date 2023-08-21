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
        <Route path='/reset-password' element={<ResetPassword />}></Route>      
    <Route path='/success-changed-pass' element={<PassSuccess />}></Route>
      </Routes>
       
    </Router>
    </>
    );
}

export default App;
