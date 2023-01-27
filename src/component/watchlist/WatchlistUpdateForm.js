import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/user";
import { Navigate, useParams } from "react-router-dom";
import StarRating from "./star.js";
const { getShow, updateShow } = require("../../helper/api");
const { removeUser } = require("../../helper/localstorage");
const WatchlistForm = () => {
	const { showId } = useParams();
	const { user, setUser } = useContext(UserContext);
	const [state, setState] = useState({
		title: "",
		streamingApp: "",
		loading: false,
		review: "",
		error: false,
		message: false,
		redirect: false,
	});
	const [rating, setRating] = useState(0);
	useEffect(() => {
		(async function () {
			const data = await getShow(user.user, user.token, showId);
			if (data.error) {
				if (data.code === 1) {
					removeUser();
					setUser(null);
					window.location.href = "/signin";
					return;
				}
				console.log(data);
			}
			setState((old) => ({
				...old,
				title: data.title,
				streamingApp: data.streaming_app,
				review: data.review,
			}));
			setRating(data.rating);
		})();
	}, []);
	if (!user) {
		return <Navigate to="/signin" />;
	}
	const handleChange = (event) => {
		setState((old) => ({
			...old,
			[event.target.name]: event.target.value,
		}));
	};
	const handleSubmit = async () => {
		if (state.loading) return;

		if (!state.title) {
			setState((old) => ({ ...old, error: "Title is Mandatory" }));
			return;
		}
		if (!state.streamingApp) {
			setState((old) => ({
				...old,
				error: "Streaming App is Mandatory",
			}));
			return;
		}
		setState((old) => ({ ...old, loading: true }));
		const data = await updateShow(
			user.user,
			user.token,
			state.title.trim(),
			state.streamingApp.trim(),
			state.review.trim(),
			rating,
			showId
		);
		if (data.error) {
			if (data.code == 1) {
				console.log("inside");
				window.location.href = "/signin";
				removeUser();
				setUser(null);
				return;
			}
			setState((old) => ({
				...old,
				error: data.error,
				message: false,
				loading: false,
			}));
			return;
		}
		setState((old) => ({
			...old,
			error: data.error,
			message: "Show Added Successfully",
			loading: false,
		}));
		window.location.href = "/Watchlist";
	};
	return (
		<>
			<div className="second w-75 m-auto mt-4">
				<div className="left" style={{ paddingTop: "40px" }}>
					<h5 style={{ color: "#394657" }} className="pt-3">
						Update Show
					</h5>
					<div className="form-group leftForm">
						<p className="text-left gg" style={{ opacity: 0.7 }}>
							Title
						</p>
						<input
							type="text"
							name="title"
							value={state.title}
							className="form-control"
							onChange={handleChange}
							placeholder="Title"
						/>
					</div>
					<div className="form-group leftForm pt-3">
						<p className="text-left gg" style={{ opacity: 0.7 }}>
							Streaming App
						</p>
						<input
							type="text"
							name="streamingApp"
							className="form-control"
							onChange={handleChange}
							placeholder="Streaming App"
							value={state.streamingApp}
						/>
					</div>
					<div className="form-group leftForm pt-3">
						<p className="text-left gg" style={{ opacity: 0.7 }}>
							Review
						</p>
						<input
							type="text"
							name="review"
							className="form-control"
							onChange={handleChange}
							placeholder="Review"
							value={state.review}
						/>
					</div>
					<div className="form-group leftForm pt-3">
						<p className="text-left gg" style={{ opacity: 0.7 }}>
							Rating
						</p>
						<StarRating setRating={setRating} rating={rating} />
					</div>
					{state.error && <p style={{ color: "red" }}>{state.error}</p>}
					{state.message && <p style={{ color: "green" }}>{state.message}</p>}
					<div className="leftForm d-grid gap-2 mt-4 mb-4">
						<button
							className="btn btn-primary loginbutton"
							onClick={handleSubmit}
						>
							{!state.loading ? (
								"Update"
							) : (
								<i className="fa fa-refresh fa-spin" />
							)}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
export default WatchlistForm;
