import React, { useState, useContext } from "react";
import { userLogin } from "../../helper/api";
import Carousel from "react-material-ui-carousel";
import { setUser } from "../../helper/localstorage";
import { UserContext } from "../../context/user";
import { Navigate, Link } from "react-router-dom";
import "./signin.css";
// import Link from "";
const Signin = () => {
	const { user } = useContext(UserContext);
	const [state, setState] = useState({
		email: "",
		password: "",
		loading: false,
		error: false,
		message: false,
		redirect: false,
	});
	if (user) {
		return <Navigate to="/Watchlist" />;
	}
	const handleChange = (event) => {
		setState((old) => ({
			...old,
			[event.target.name]: event.target.value,
		}));
	};
	const handleSubmit = async () => {
		if (state.loading) return;
		setState((old) => ({ ...old, loading: true }));
		const data = await userLogin(state.email.trim(), state.password.trim());
		if (data?.error) {
			setState((old) => ({
				...old,
				error: data.error,
				message: false,
				loading: false,
			}));
			return;
		}
		setUser(data);
		window.location.href = "/Watchlist";
	};
	const item = [
		"https://orocorp.greythr.com/uas/v1/cms/asset/17042120-a978-4094-b8c9-deeed84dfe7e",
		"https://orocorp.greythr.com/uas/v1/cms/asset/9e451477-0a45-4270-a843-bc1127f792bf",
		"https://orocorp.greythr.com/uas/v1/cms/asset/5fe7bab4-8479-4266-a749-97a7208b7a40",
	];
	return (
		<>
			<div className="second mt-4">
				<div className="left" style={{ paddingTop: "40px" }}>
					<h5 style={{ color: "#394657" }} className="pt-3">
						Hello there!👋
					</h5>
					<div className="form-group leftForm">
						<p className="text-left gg" style={{ opacity: 0.7 }}>
							Email
						</p>
						<input
							type="text"
							name="email"
							className="form-control"
							onChange={handleChange}
							placeholder="Email"
						/>
					</div>
					<div className="form-group leftForm pt-3">
						<p className="text-left gg" style={{ opacity: 0.7 }}>
							Password
						</p>
						<input
							type="password"
							name="password"
							className="form-control"
							onChange={handleChange}
							placeholder="password"
						/>
						<Link to="/signup" style={{ textDecoration: "none" }}>
							<p
								className="text-primary pt-2 font-sm"
								style={{ cursor: "pointer" }}
							>
								Create Account
							</p>
						</Link>
					</div>
					{state.error && <p style={{ color: "red" }}>{state.error}</p>}
					{state.message && <p style={{ color: "green" }}>{state.message}</p>}
					<div className="leftForm d-grid gap-2 mt-4">
						<button
							className="btn btn-primary loginbutton"
							onClick={handleSubmit}
						>
							{!state.loading ? (
								"Sign in"
							) : (
								<i className="fa fa-refresh fa-spin" />
							)}
						</button>
					</div>
				</div>
				<div className="right">
					<Carousel>
						{item.map((src) => (
							<div key={src}>
								<img src={src} height={400} />
								<h4>Manage your Watchlist with us </h4>
							</div>
						))}
					</Carousel>
				</div>
			</div>
		</>
	);
};
export default Signin;
