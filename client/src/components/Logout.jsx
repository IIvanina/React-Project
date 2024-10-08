import { useContext, useEffect } from "react";
import * as authService from '../services/authService.js';
import { useNavigate } from "react-router-dom";
import Path from "../path.js";
import AuthContext from "../contexts/authContext.jsx";

export default function Logout() {
    const navigate = useNavigate();
    const { logoutHandler } = useContext(AuthContext);

    useEffect(() => {
        authService.logout()
            .then(() => {
                logoutHandler();
                navigate(Path.Home); 
            })
            .catch((error) => {
                console.error("Logout failed", error);
                navigate(Path.Home); 
            });
    }, []);

    return null;
}
