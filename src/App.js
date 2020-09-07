import React from "react";
import Converter from "./Converter";
import logo from "./images/logo.jpg";
import "./App.css";

function App() {
	return (
		<div className="App">
			<div className="App__nav">
				<img src={logo} className="App__logo" alt="TM Studioz Logo" />
				<h1 className="App__header">TM Studioz Converter</h1>
			</div>
			<Converter />
		</div>
	);
}

export default App;
