import React, { Component } from "react";
import { Link } from "react-router-dom";
import Context from "../Context";
import config from "../config";
import spinner from "../images/spinner.svg";
import "./FileUpload.css";

class FileUpload extends Component {
  static contextType = Context;

  state = {
    error: null,
    type: "URL",
    results: null,
    loading: false,
  };

  handleAnother(e) {
    e.preventDefault();
    this.setState({
      results: null,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    var formdata = new FormData();
    formdata.append("file", document.getElementById("input").files[0]);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${config.API_ENDPOINT}/bpm-key`, requestOptions)
      .then((response) => response.json())
      .then((result) => this.setState({ results: result, loading: false }))
      .catch((error) => console.log("error", error));
  }

  render() {
    const error = !!this.state.error ? (
      <p className="error">{this.state.error}</p>
    ) : (
      <></>
    );
    const form =
      this.state.results === null ? (
        <div className="FileUpload__uploader">
          <h1 className="FileUpload__title">
            Upload your MP3 or WAV file to analyze for BPM and Key
          </h1>
          <form
            className="FileUpload__form"
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <input type="file" className="FileUpload__input" id="input"></input>
            <button className="input_btn FileUpload__btn">
              Find BPM and Key
            </button>
          </form>
        </div>
      ) : (
        <></>
      );
    const results = !!this.state.results ? (
      <div className="FileUpload__results">
        <h1>BPM Results:</h1>
        <h2>{Math.round(this.state.results.bpm)} BPM</h2>
        <button
          className="FileUpload__btn"
          onClick={(e) => this.handleAnother(e)}
        >
          Calculate another MP3
        </button>
      </div>
    ) : (
      <></>
    );
    const loading = this.state.loading ? (
      <div className="loading_container">
        <img className="loading" src={spinner} alt="Loading" />
      </div>
    ) : (
      <>
        {form}
        {results}
      </>
    );
    return (
      <div className="FileUpload">
        <Link to={"/"}>
          <button className="Converter__download purple">Go Back</button>
        </Link>
        {loading}
        {error}
      </div>
    );
  }
}

export default FileUpload;
