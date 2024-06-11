import './App.css';
import Register from './Pages/Resgister/Register';
import Login from "./Pages/Login/Login";
import Dashboard from './Pages/Dashboard/Dashboard';
import Welcome from './Pages/Welcome/Welcome';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';
import { Toaster} from "react-hot-toast";
import { UserContextProvider } from './Context/UserContex';
import Profile from './Pages/Profile/Profile';
import {devServerURL} from "./MetaData/MetaData";
import {ProtectedRoutes} from "./Utils/ProtectedRoutes";

axios.defaults.baseURL = devServerURL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className='app'>
      <UserContextProvider>
      <Toaster position='top-center' toastOptions={{duration: 2000}}/>
      <Router>
        <Routes>
          <Route path = "/" element = {<Welcome/>}></Route>
          <Route path = "/register" element = {<Register/>}></Route>
          <Route path = "/login" element = { <Login/> }></Route>
          <Route element = {<ProtectedRoutes/>}>
            <Route path = "/dashboard" element = { <Dashboard/> }></Route>
            <Route path = "/profile" element = { <Profile/> }></Route>
          </Route>
        </Routes>
      </Router>
      </UserContextProvider>

      {/* <Navbar/>
      <LeftMenu/>
      <Content/> */}
      
      {/* <Register/> */}
      
      {/* <Login/> */}

      
      
    </div>
  );
}

export default App;
