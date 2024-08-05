import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthContext from "./contexts/authContext.js";
import * as authService from "./services/authService.js";
import Path from "../src/path.js";

import Footer from "./components/Footer.jsx";
import Carousel from "./components/Carousel.jsx";
import Header from "./components/Header.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Contact from "./components/Contact.jsx";
import WorkingHour from "./components/WorkingHour.jsx";
import Testimonial from "./components/Testimonial.jsx";
import NotFound from "./components/NotFound.jsx";
import SignIn from "./components/SignIn.jsx";
import Registration from "./components/Registration.jsx";
import BookingCalendar from "./components/BookingCalendar.jsx";
import MyBookings from "./components/MyBookings.jsx";
import Logout from "./components/Logout.jsx";

function App() {
    const [auth, setAuth] = useState({});
    const navigate = useNavigate();

    const loginSubmitHandler = async (values, closeModal) => {
        try {
            const result = await authService.login(values.email, values.password);
            setAuth(result);
            localStorage.setItem('accessToken', result.accessToken);
            closeModal();
            navigate(Path.Calendar);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const registerSubmitHandler = async (values, closeModal) => {
        try {
            const result = await authService.register(values.email, values.password);
            setAuth(result);
            localStorage.setItem('accessToken', result.accessToken);
            closeModal();
            navigate(Path.Calendar);
        } catch (error) {
            console.error("Registration failed", error);
        }
    }

    const logoutHandler = () => {
        setAuth({});
        localStorage.removeItem('accessToken');
    };

    const values = { 
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        email: auth.email,
        username: auth.username || auth.email,
        isAuthenticated: !!auth.accessToken,
    }

    return (
        <AuthContext.Provider value={values}>
            <>
                <Header />
                <Routes>
                    <Route path={Path.Home} element={<Carousel />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/open" element={<WorkingHour />} />
                    <Route path="/testimonial" element={<Testimonial />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path={Path.Calendar} element={<BookingCalendar />} />
                    <Route path="/bookings" element={<MyBookings />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path={Path.Logout} element={<Logout />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </>
        </AuthContext.Provider>
    );
}

export default App;
