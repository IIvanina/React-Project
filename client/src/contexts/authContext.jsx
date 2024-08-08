import { useNavigate } from "react-router-dom";
import { createContext, useState } from "react";
import usePersistedState from "../hooks/usePersistedState.js";
import * as authService from "../services/authService.js";
import Path from "../path.js";

const AuthContext = createContext();

export const AuthProvider = ({
    children,
    
}) => {
    const [auth, setAuth] = usePersistedState({});
    const navigate = useNavigate();

    const loginSubmitHandler = async (values, closeModal) => {
        try {
            const result = await authService.login(values.email, values.password);

            setAuth(result);
            console.log(`Login user Id ${result._id}`);
            console.log(`Login token ${result.accessToken}`);
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('userId', result._id);

            closeModal();

            navigate(`/calendar/${result.username}`);

        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const registerSubmitHandler = async (values, closeModal) => {
        try {
            const result = await authService.register(values.email, values.password, values.name);
            
            // Set auth and save tokens in local storage after registration
            setAuth(result);
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('userId', result._id);

            // Close the registration modal
            closeModal();

            // Automatically log in the user after registration
            navigate(`/calendar/${result.username}`);

        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    const logoutHandler = () => {
        setAuth({});

        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
    };

    const values = { 
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        userId: auth._id,
        email: auth.email,
        username: auth.username || auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;