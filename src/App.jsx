import logo from './logo.svg';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    <Routes>
      </Routes>      
    </Router>
    </>
    );
}

export default App;
