import React from "react";
import ReactDOM from "react-dom/client";
// import StarRating from "./components/StarRating/StarRating";
// import TestCollapse from "./components/TextCollapse/TestCollapse";
// import "./index.css";
// import ConverterForm from "./components/Currency Converter/ConverterForm";
// import App from "./App";
import App from "./components/Geolocator/Geolocator.jsx";
/* function Test() {
	const [movieRating, setMovieRating] = useState(0);
	return (
		<>
			<div>
				<StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
				<p>This movei was rated {movieRating}</p>
			</div>
		</>
	);
} */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		{/* <Geolocator /> */}
		<App />
		{/* <ConverterForm /> */}
		{/* <TestCollapse /> */}
		{/* <StarRating
			messages={["Terrible", "Bad", "Okay", "Good", "Excellent"]}
			defaultRating={2}
		/>
		<StarRating size={24} color="red" className="container" />
		<Test /> */}
	</React.StrictMode>
);
