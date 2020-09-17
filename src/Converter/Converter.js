import React, { Component } from "react";
import url from "../images/url.svg";
import ytLogo from "../images/youtube.svg";
import config from "../config";
import SearchResults from "../SearchResults/SearchResults";
import Context from "../Context";
import "./Converter.css";

class Converter extends Component {
	static contextType = Context;

	state = {
		title: null,
		embed: null,
		error: null,
		type: "URL",
		searchResults: null,
	};
	handleDownload(e) {
		e.preventDefault();
		const URL = document.querySelector(".Converter__input").value;
		window.location.href = `${config.API_ENDPOINT}/download?URL=${URL}&title=${this.state.title}`;
	}

	getInfo() {
		const search = document.querySelector(".Converter__input").value;
		return fetch(`${config.API_ENDPOINT}/info?${this.state.type}=${search}`, {
			method: "GET",
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	}
	handleUrlSearchBtn(e) {
		e.preventDefault();
		this.setState({
			type: "URL",
		});
	}
	handleYtSearchBtn(e) {
		e.preventDefault();
		this.setState({
			type: "search",
		});
		document.querySelector(".Converter__find_btn").focus();
	}
	handleSubmit(e) {
		e.preventDefault();
		if (document.querySelector(".Converter__input").value.trim().length === 0) {
			this.setState({
				error: "Please paste URL into search bar",
			});
		} else if (this.state.type === "URL") {
			this.setState({
				error: null,
			});
			this.getInfo().then((info) => {
				this.setState({
					title: info.videoDetails.title,
					embed: info.videoDetails.embed.iframeUrl,
				});
			});
		} else if (this.state.type === "search") {
			this.getInfo().then((info) => {
				const results = info.items.splice(0, 10);
				// this.setState({ searchResults: results });
				this.context.updateResults(results);
				this.props.history.push(
					`/yt/search/${document.querySelector(".Converter__input").value}`
				);
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
						<button
							onClick={(e) => this.handleUrlSearchBtn(e)}
							className="Converter__url input_btn"
						>
							<img src={url} className="btn_img" alt="URL Link" />
							URL
						</button>
						<button
							onClick={(e) => this.handleYtSearchBtn(e)}
							className="Converter__yt_search input_btn"
						>
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
				{!!this.state.searchResults ? (
					this.state.searchResults.map((item) => {
						if (item.link) {
							return <SearchResults item={item} />;
						} else {
							return <></>;
						}
					})
				) : (
					<></>
				)}
			</div>
		);
	}
}

export default Converter;
