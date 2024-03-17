import './App.css';
import Register from './Pages/Resgister/Register';
import Login from "./Pages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard/Dashboard';
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast";
import { UserContextProvider } from './Context/UserContex';
import Profile from './Pages/Profile/Profile';

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className='app'>
      <UserContextProvider>
      <Toaster position='top-center' toastOptions={{duration: 2000}}/>
      <Router>
        <Routes>
          <Route path = "/register" element = {<Register/>}></Route>
          <Route path = "/login" element = { <Login/> }></Route>
          <Route path = "/dashboard" element = { <Dashboard/> }></Route>
          <Route path = "/profile" element = { <Profile/> }></Route>
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
