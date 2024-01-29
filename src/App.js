import Account from './pages/account/Account';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingIn from './pages/signin/SignIn';
import Login from './pages/login/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/account' element={<Account/>}/>
          <Route path='/signin' element={<SingIn/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
