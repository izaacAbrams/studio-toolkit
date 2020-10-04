import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Converter from "./Converter/Converter";
import logo from "./images/logo.png";
import fbLogo from "./images/facebook.svg";
import igLogo from "./images/instagram.svg";
import SearchResults from "./SearchResults/SearchResults";
import FileUpload from "./FileUpload/FileUpload";
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
          <Link to={"/"}>
            <img src={logo} className="App__logo" alt="TM Studioz Logo" />
          </Link>
          <div className="links_wrapper">
            <a target="#blank" href="https://www.facebook.com/TmConverter">
              <img
                src={fbLogo}
                className="social_links fb_link"
                alt="Facebook Link"
              />
            </a>
            <a target="#blank" href="https://www.instagram.com/tmconverter">
              <img src={igLogo} className="social_links" alt="Instagram Link" />
            </a>
          </div>
        </div>
        <Context.Provider value={this.state}>
          <Switch>
            <Route exact path={"/"} component={Converter} />
            <Route path={"/:type/search/:query"} component={SearchResults} />
            <Route path={"/bpm-key-finder"} component={FileUpload} />
          </Switch>
        </Context.Provider>
      </div>
    );
  }
}

export default App;
