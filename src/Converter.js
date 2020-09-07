import React, { Component } from "react";
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
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<input className="Converter__input" type="text" />
					<button className="Converter__find_btn" type="submit">
						Convert
					</button>
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
