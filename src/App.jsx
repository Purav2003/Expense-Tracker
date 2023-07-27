import logo from './logo.svg';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import Income from './Pages/Income';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/income' element={<Income />}></Route>
        
      </Routes>
       
    </Router>
    </>
    );
}

export default App;
