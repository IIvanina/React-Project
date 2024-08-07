import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/authContext.jsx";
import Path from "../src/path.js";

import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import NotFound from "./components/NotFound.jsx";
import SignIn from "./components/SignIn.jsx";
import BookingCalendar from "./components/BookingCalendar.jsx";
import MyBookings from "./components/MyBookings.jsx";
import Logout from "./components/Logout.jsx";
import AuthGuard from "./components/guards/AuthGuard.jsx";

function App() {

    return (
        <AuthProvider >
            <>
                <Header />
                <Routes>
                    <Route path={Path.Home} element={<About />} />
                    <Route path={Path.Services} element={<Services />} />
                    <Route path={Path.Calendar} element={<AuthGuard><BookingCalendar /></AuthGuard>} />
                    <Route path={Path.Bokkings} element={<AuthGuard><MyBookings /></AuthGuard>} />
                    <Route path={Path.Login} element={<SignIn />} />
                    <Route path={Path.Logout} element={<Logout />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </>
        </AuthProvider>
    );
}

export default App;
