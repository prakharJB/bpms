import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Dashboard';
import SignUp from '../src/screens/SignUp';
import Login from '../src/screens/SignIn';
import Dashboard from '../src/screens/Dashboard';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
