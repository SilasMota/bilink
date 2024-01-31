import "./App.scss";
import Account from './pages/account/Account';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingIn from './pages/signin/SignIn';
import Login from './pages/login/Login';
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {

  const currentUser = useSelector((state) => state.user.value);

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/login" />;
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
