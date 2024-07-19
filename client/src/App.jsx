import {Routes, Route} from "react-router-dom"
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

function App() { 

	return (
		<>
			<Header/>

			<Routes>
				<Route path="/" element={<Carousel />} />
				<Route path="/about" element={<About />} />
				<Route path="/services" element={<Services />} />
				<Route path="/open" element={<WorkingHour />} />
				<Route path="/testimonial" element={<Testimonial />} />
				<Route path="/contact" element={<Contact />} />
				{/* <Route path="/registration" element={<Registration />} /> */}
				<Route path="*" element={<NotFound />} />
			</Routes>

			<Footer />
			<SignIn />
		</>
	);
}



export default App;
