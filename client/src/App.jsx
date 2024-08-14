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
import BookingDetails from "./components/BookingDetails.jsx"; // Ensure correct import
import Registration from "./components/Registration.jsx";
import { useEffect } from "react";

function App() {
    
    // useEffect(() => {
    //    fetch(`${import.meta.env.VITE_API_URL}`)
    //       .then((res) => res.json())
    //       .then(result => result)
    // })

    return (
        <AuthProvider>
            <>
                <Header />
                <Routes>
                    <Route path={Path.Home} element={<About />} />
                    <Route path={Path.Services} element={<Services />} />
                    <Route path={Path.Login} element={<SignIn />} />
                    <Route path={Path.Register} element={<Registration />} />
                    <Route path={Path.Logout} element={<Logout />} />
                    <Route path="*" element={<NotFound />} />
                    <Route element={<AuthGuard />}>
                        <Route path="/calendar/:username" element={<BookingCalendar />} />
                        <Route path="/bookings/:username" element={<MyBookings />} />
                        <Route path="/booking/:_id" element={<BookingDetails />} /> {/* Updated path */}
                    </Route>
                </Routes>
                <Footer />
            </>
        </AuthProvider>
    );
}

export default App;
