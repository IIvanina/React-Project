import { Routes, Route, useNavigate } from "react-router-dom";

import { AuthProvider } from "./contexts/authContext.jsx";
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
import BookingCalendar from "./components/BookingCalendar.jsx";
import MyBookings from "./components/MyBookings.jsx";
import Logout from "./components/Logout.jsx";

function App() {

    return (
        <AuthProvider >
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
