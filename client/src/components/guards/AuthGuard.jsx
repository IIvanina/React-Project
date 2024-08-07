import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Path from "../../path.js";
import AuthContext from "../../contexts/authContext.jsx";

export default function AuthGuard(props) {

    const { isAuthorization} = useContext(AuthContext);

    if(!isAuthorization){
        return <Navigate to={Path.Home} />
    }
    return (
        <>
            {props.children}
        </>
    );
}