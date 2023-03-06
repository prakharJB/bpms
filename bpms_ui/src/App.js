import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/screens/Home';
import SignUp from '../src/screens/SignUp';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<SignUp />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
