import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContex";

export const ProtectedRoutes = () => {
    const data = window.localStorage.getItem("loggedUser")
    const userLogged = JSON.parse(data);
    return userLogged ? <Outlet/> : <Navigate to= "/"/>;
}