import React, { Component } from "react";
import url from "./images/url.svg";
import ytLogo from "./images/youtube.svg";
import config from "./config";

class Converter extends Component {
	state = {
		title: null,
		embed: null,
		error: null,
	};
	handleDownload(e) {
		e.preventDefault();
		const URL = document.querySelector(".Converter__input").value;
		window.location.href = `${config.API_ENDPOINT}/download?URL=${URL}&title=${this.state.title}`;
	}

	getInfo() {
		const search = document.querySelector(".Converter__input").value;
		return fetch(`${config.API_ENDPOINT}/info?URL=${search}`, {
			method: "GET",
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	}
	handleSubmit(e) {
		e.preventDefault();
		if (document.querySelector(".Converter__input").value.trim().length === 0) {
			this.setState({
				error: "Please paste URL into search bar",
			});
		} else {
			this.setState({
				error: null,
			});
			this.getInfo().then((info) => {
				this.setState({
					title: info.videoDetails.title,
					embed: info.videoDetails.embed.iframeUrl,
				});
			});
		}
	}

	render() {
		const error = !!this.state.error ? (
			<p className="error">{this.state.error}</p>
		) : (
			<></>
		);
		return (
			<div className="Converter">
				<form
					className="Converter__form"
					onSubmit={(e) => this.handleSubmit(e)}
				>
					<div className="Converter__input_wrapper">
						<input className="Converter__input" type="text" />
						<button className="Converter__find_btn" type="submit"></button>
					</div>
					<div className="Converter__btn_wrapper">
						<button className="Converter__url input_btn">
							<img src={url} className="btn_img" alt="URL Link" />
							URL
						</button>
						<button className="Converter__yt_search input_btn">
							<img src={ytLogo} className="btn_img" alt="Youtube Search" />
							Search
						</button>
					</div>
				</form>
				{!!this.state.title ? (
					<h2 className="Converter__vid_title">{this.state.title}</h2>
				) : (
					<></>
				)}
				{error}
				{!!this.state.embed ? (
					<div className="Converter__container">
						<iframe
							src={this.state.embed}
							className="Converter__video"
							title={this.state.title}
						/>
						<a
							href="/"
							className="Converter__download"
							download
							onClick={(e) => this.handleDownload(e)}
						>
							Download
						</a>
					</div>
				) : (
					<></>
				)}
			</div>
		);
	}
}

export default Converter;
