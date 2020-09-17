import React, { Component } from "react";
import { Link } from "react-router-dom";
import Context from "../Context";
import config from "../config";
import "./SearchResults.css";

class SearchResults extends Component {
	static contextType = Context;

	state = {
		results: [],
		loading: true,
		error: null,
	};
	handleDownload(e, link, title) {
		e.preventDefault();
		// const URL = document.querySelector(".Converter__input").value;
		window.location.href = `${config.API_ENDPOINT}/download?URL=${link}&title=${title}`;
	}

	getInfo(search) {
		// const search = document.querySelector(".Converter__input").value;
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
				return !!item.link ? (
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
						<a
							href="/"
							className="Converter__download"
							key={item.link + item.views}
							download
							onClick={(e) => this.handleDownload(e, item.link, item.title)}
						>
							Download
						</a>
					</div>
				) : null;
			});
		} else if (this.props.match.params.type === "URL") {
			return (
				<div className="Converter__container">
					<h2 className="Converter__vid_title">{this.state.results.title}</h2>
					<iframe
						src={this.state.results.embed.iframeUrl}
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
					<Link to={"/"}>
						<button className="Converter__download purple">Go Back</button>
					</Link>
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
		// let results;
		// console.log(this.props.location);
		// return this.getInfo(this.props.match.params.query).then((results) =>
		// 	this.handleResults(results)
		// );
		const loading = this.state.loading ? (
			<h1>Loading</h1>
		) : (
			this.handleResults()
		);
		return <div className="SearchResults">{loading}</div>;
	}
}

export default SearchResults;
