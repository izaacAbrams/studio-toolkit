import React, { Component } from "react";
import Context from "../Context";

class FileUpload extends Component {
  static contextType = Context;

  state = {
    error: null,
    type: "URL",
  };

  handleSubmit(e) {
    e.preventDefault();
    console.log(document.getElementById("input").files[0]);
  }

  render() {
    const error = !!this.state.error ? (
      <p className="error">{this.state.error}</p>
    ) : (
      <></>
    );
    return (
      <div className="FileUpload">
        <h1 className="FileUpload__title">
          Upload your MP3 or WAV file to analyze for BPM and Key
        </h1>
        <form
          className="Converter__form"
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <input type="file" id="input"></input>
          <button className="input_btn">Search</button>
        </form>
        {error}
      </div>
    );
  }
}

export default FileUpload;
