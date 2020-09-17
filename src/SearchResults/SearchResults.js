import React, { Component } from "react";
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
		return fetch(`${config.API_ENDPOINT}/info?${type}=${search}`, {
			method: "GET",
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	}
	handleResults() {
		if (this.state.results.length > 1) {
			return this.state.results.map((item) => {
				return !!item.link ? (
					<div key={item.link}>
						<p className="SearchResults__title">{item.title}</p>
						<iframe
							key={item.link}
							title={item.title}
							src={`https://youtube.com/embed/${item.link.replace(
								"https://www.youtube.com/watch?v=",
								""
							)}`}
						/>
						<a
							href="/"
							className="Converter__download"
							download
							onClick={(e) => this.handleDownload(e, item.link, item.title)}
						>
							Download
						</a>
					</div>
				) : (
					<></>
				);
			});
		} else if (this.state.results.length === 1) {
			return (
				<div className="Converter__container">
					<h2 className="Converter__vid_title">{this.state.title}</h2>
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
			);
		} else {
			return <h1>No Results Found, Please Try Again.</h1>;
		}
	}
	componentDidMount() {
		this.getInfo(this.props.match.params.query).then((info) =>
			this.setState({ results: info.items, loading: false })
		);
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
