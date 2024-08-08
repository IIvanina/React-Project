import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Path from "../../path.js";
import AuthContext from "../../contexts/authContext.jsx";

export default function AuthGuard(props) {

    const { isAuthenticated} = useContext(AuthContext);

    if(!isAuthenticated){
        return <Navigate to={Path.Home} />
    }
    return <Outlet />
}