import './App.css';
import { Routes, Router, Route, Link, BrowserRouter } from 'react-router-dom';
import SigninPage from './views/signinPage';
import SignupPage from './views/signupPage';
import Navbar from './components/navbar';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/sign-in" element={<SigninPage/>} exact/>
          <Route path="/sign-up" element={<SignupPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
