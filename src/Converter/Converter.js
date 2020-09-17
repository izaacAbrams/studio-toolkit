import React, { Component } from "react";
import url from "../images/url.svg";
import ytLogo from "../images/youtube.svg";
import Context from "../Context";
import "./Converter.css";

class Converter extends Component {
	static contextType = Context;

	state = {
		error: null,
		type: "URL",
	};

	handleUrlSearchBtn(e) {
		e.preventDefault();
		document.querySelector(".Converter__yt_search").style.border = "0";
		document.querySelector(".Converter__url").style.border = "1px solid white";
		this.setState({
			type: "URL",
		});
	}
	handleYtSearchBtn(e) {
		e.preventDefault();
		document.querySelector(".Converter__yt_search").style.border =
			"1px solid white";
		document.querySelector(".Converter__url").style.border = "0";

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
			this.props.history.push(
				`/URL/search/${document.querySelector(".Converter__input").value}`
			);
		} else if (this.state.type === "search") {
			this.props.history.push(
				`/yt/search/${document.querySelector(".Converter__input").value}`
			);
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
				<h1 className="Converter__title">
					Please paste the URL in the search bar below, or click "Search" to
					search Youtube videos
				</h1>
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
							style={{ border: "1px solid white" }}
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
				{error}
			</div>
		);
	}
}

export default Converter;
