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
    const [errorMessage, setErrorMessage] = useState(null);
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
            // console.error("Login failed", error);
            if (error.message.includes('403')) {
                throw new Error("Login or password don't match");
            } else {
                throw error; 
            }
        }
    };

    const registerSubmitHandler = async (values, closeModal) => {
        try {
            const result = await authService.register(values.email, values.password, values.name);
            
            setAuth(result);
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('userId', result._id);

            closeModal();

            navigate(`/calendar/${result.username}`);

        } catch (error) {
            console.error("Registration failed", error);
            if (error.message.includes('already exists')) {
                setErrorMessage('A user with the same email already exists');
            } else {
                setErrorMessage('Registration failed');
            }
            
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
        errorMessage,
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