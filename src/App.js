import "./App.scss";
import Account from './pages/account/Account';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingIn from './pages/signin/SignIn';
import Login from './pages/login/Login';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import { Navigate } from "react-router-dom";

function App() {
  const [user] = useAuthState(auth);

  const RequireAuth = ({ children }) => {
    return user ? (children) : <Navigate to="/login" />;
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<RequireAuth><Home/></RequireAuth>}/>
          <Route path='/profile' element={<RequireAuth><Profile/></RequireAuth>}/>
          <Route path='/account' element={<RequireAuth><Account/></RequireAuth>}/>
          <Route path='/signin' element={<SingIn/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
