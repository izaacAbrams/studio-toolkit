import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Converter from "./Converter/Converter";
import logo from "./images/logo.png";
import fbLogo from "./images/facebook.svg";
import igLogo from "./images/instagram.svg";
import SearchResults from "./SearchResults/SearchResults";
import Context from "./Context";
import "./App.css";

class App extends Component {
	static contextType = Context;

	state = {
		searchResults: [],
		updateResults: (results) => {
			this.setState({ searchResults: results });
		},
	};
	render() {
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
				<Context.Provider value={this.state}>
					<Switch>
						<Route exact path={"/"} component={Converter} />
						<Route path={"/:type/search/:query"} component={SearchResults} />
					</Switch>
				</Context.Provider>
			</div>
		);
	}
}

export default App;
