import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/screens/Home';
import SignUp from '../src/screens/SignUp';
import Login from '../src/screens/SignIn';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
