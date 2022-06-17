import './App.css';
import { Routes, Router, Route, Link, BrowserRouter } from 'react-router-dom';
import SigninPage from './views/signinPage';
import SignupPage from './views/signupPage';
import Navbar from './components/navbar';

import { createUseStyles } from 'react-jss';

const useAppStyles = createUseStyles({
  'app-wrapper': {
    width: '100%',
    height: '100%'
  }
})

function App() {
  const appStyles = useAppStyles();

  return (
    <BrowserRouter>
      <div className={appStyles['app-wrapper']}>
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
