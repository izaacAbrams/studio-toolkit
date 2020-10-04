import React, { Component } from "react";
import { Link } from "react-router-dom";
import Context from "../Context";
import config from "../config";
import spinner from "../images/spinner.svg";
import download from "downloadjs";
import lamejs from "lamejs";
import "./SearchResults.css";

class SearchResults extends Component {
  static contextType = Context;

  state = {
    results: [],
    loading: true,
    error: null,
  };

  handleDownload(e, link, title, type) {
    e.preventDefault();
    window.location.href = `${config.API_ENDPOINT}/download?URL=${link}&title=${title}&type=${type}`;
    // return fetch(
    //   `${config.API_ENDPOINT}/download?URL=${link}&title=${title}&type=${type}`,
    //   {
    //     method: "GET",
    //   }
    // )
    //   .then((res) => {
    //     let mp3Buffer = new Int8Array();
    //     // response.body is a readableStream
    //     const reader = res.body.getReader();
    //     function handleChunk({ done, value }) {
    //       if (done) {
    //         //       //everything has been loaded, call `download()` to save gthe file as pdf and name it "my-file.pdf"
    //         download(mp3Buffer, `music.wav`, "audio/wav");

    //         return;
    //       }
    //       //     // concat already loaded data with the loaded chunk
    //       mp3Buffer = Int8Array.from([...mp3Buffer, ...value]);
    //       //     // retreive next chunk
    //       reader.read().then(handleChunk);
    //     }
    //     //   //retreive first chunk
    //     reader.read().then(handleChunk);
    //   })
    //   .catch((err) => console.error(err));
  }

  getInfo(search) {
    const type = this.props.match.params.type === "yt" ? "search" : "URL";
    const searchFormat =
      type === "URL"
        ? (search = `https://youtube.com/watch${this.props.location.search}`)
        : search;
    return fetch(`${config.API_ENDPOINT}/info?${type}=${searchFormat}`, {
      method: "GET",
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  }

  makeTitle(title) {
    return title.length > 40 ? (
      <p key={title} className="SearchResults__title">
        {title.split("").slice(0, 40).join("")}...
      </p>
    ) : (
      <p key={title} className="SearchResults__title">
        {title}
      </p>
    );
  }

  handleResults() {
    if (this.props.match.params.type === "yt") {
      return this.state.results.map((item) => {
        console.log(item);
        return !!item.link && !item.live ? (
          <div className="SearchResults__result" key={item.link + item.title}>
            <div className="SearchResults__container">
              <iframe
                key={item.link}
                title={item.title}
                className="SearchResults__iframe"
                src={`https://youtube.com/embed/${item.link.replace(
                  "https://www.youtube.com/watch?v=",
                  ""
                )}`}
              />
              {!!item.title ? this.makeTitle(item.title) : null}
            </div>
            <div className="dropdown">
              <button className="dropbtn">Download</button>
              <div className="dropdown-content">
                <a
                  href="/"
                  download
                  onClick={(e) =>
                    this.handleDownload(e, item.link, item.title, "mp3")
                  }
                >
                  MP3
                </a>
                <a
                  href="/"
                  download
                  onClick={(e) =>
                    this.handleDownload(e, item.link, item.title, "wav")
                  }
                >
                  WAV
                </a>
                <a
                  href="/"
                  download
                  onClick={(e) =>
                    this.handleDownload(e, item.link, item.title, "mp4")
                  }
                >
                  MP4
                </a>
              </div>
            </div>
          </div>
        ) : null;
      });
    } else if (this.props.match.params.type === "URL") {
      return (
        <div className="Converter__container">
          <div className="Converter__header">
            <Link to={"/"}>
              <button className="Converter__download purple">Go Back</button>
            </Link>
            <h2 className="Converter__vid_title">{this.state.results.title}</h2>
          </div>
          <iframe
            src={this.state.results.embed.iframeUrl}
            className="Converter__video"
            title={this.state.results.title}
          />
          <div className="dropdown">
            <button className="dropbtn">Download</button>
            <div className="dropdown-content">
              <a
                href="/"
                download
                onClick={(e) =>
                  this.handleDownload(
                    e,
                    this.state.results.video_url,
                    this.state.results.title,
                    "mp3"
                  )
                }
              >
                MP3
              </a>
              <a
                href="/"
                download
                onClick={(e) =>
                  this.handleDownload(
                    e,
                    this.state.results.video_url,
                    this.state.results.title,
                    "wav"
                  )
                }
              >
                WAV
              </a>
              <a
                href="/"
                download
                onClick={(e) =>
                  this.handleDownload(
                    e,
                    this.state.results.video_url,
                    this.state.results.title,
                    "mp4"
                  )
                }
              >
                MP4
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>No Results Found, Please Try Again.</h1>;
    }
  }
  componentDidMount() {
    this.getInfo(this.props.match.params.query).then((info) => {
      if (info.items) {
        this.setState({ results: info.items, loading: false });
      } else {
        this.setState({ results: info.videoDetails, loading: false });
      }
    });
  }
  render() {
    const loading = this.state.loading ? (
      <div className="loading_container">
        <img className="loading" src={spinner} alt="Loading" />
      </div>
    ) : (
      this.handleResults()
    );
    return (
      <div className="SearchResults">
        {this.props.match.params.type === "yt" && !this.state.loading ? (
          <div className="SearchResults__nav">
            <h1 className="SearchResults__result_title">
              Results for "{this.props.match.params.query}"
            </h1>
            <Link to={"/"} className="SearchResults__back">
              Go Back
            </Link>
          </div>
        ) : null}
        {loading}
      </div>
    );
  }
}

export default SearchResults;
