import React from "react";
import Converter from "./Converter";
import logo from "./images/logo.png";
import fbLogo from "./images/facebook.svg";
import igLogo from "./images/instagram.svg";
import blurredBG from "./images/blur_bg.svg";
import "./App.css";

function App() {
	return (
		<div className="App">
			<div className="App__nav">
				<img src={logo} className="App__logo" alt="TM Studioz Logo" />
				<div className="links_wrapper">
					<img
						src={fbLogo}
						className="social_links fb_link"
						alt="Facebook Link"
					/>
					<img src={igLogo} className="social_links" alt="Instagram Link" />
				</div>
			</div>
			<Converter />{" "}
			{/* <img
				src={blurredBG}
				className="App__blurred_bg"
				alt="Blurred Background"
			/> */}
		</div>
	);
}

export default App;
