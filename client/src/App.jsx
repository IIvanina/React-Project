import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthContext from "./contexts/authContext.js";
import * as authService from "./services/authService.js"
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

function App() {
	const [auth, setAuth] = useState({});
	const navigate = useNavigate();
	const loginSubmitHandler = async (values) => {
		console.log(values)

		const result = await authService.login(values.email, values.password);
		setAuth(result)
		navigate(Path.Home)
	}	

	return (
		<AuthContext.Provider value={{loginSubmitHandler}}>
			<>
				<Header />
				{/* <BookingCalendar /> */}
				<Routes>
					<Route path="/" element={<Carousel />} />
					<Route path="/about" element={<About />} />
					<Route path="/services" element={<Services />} />
					<Route path="/open" element={<WorkingHour />} />
					<Route path="/testimonial" element={<Testimonial />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/calendar" element={<BookingCalendar />} />
					<Route path="/bookings" element={<MyBookings />} />
					<Route path="/login" element={<SignIn />} />
					{/* <Route path="/registration" element={<Registration />} /> */}
					<Route path="*" element={<NotFound />} />
				</Routes>

				<Footer />
				<SignIn />
			</>
		</AuthContext.Provider>
	);
}



export default App;
