import { Navigate, Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/user";
const { getShowList, deleteShow } = require("../../helper/api");
const { removeUser } = require("../../helper/localstorage");
const Watchlist = () => {
	const [show, setShow] = useState([]);
	const { user, setUser } = useContext(UserContext);
	useEffect(() => {
		(async function () {
			let data;
			if (user) {
				data = await getShowList(user?.user, user?.token);
			}
			if (data.code === 1) {
				removeUser();
				setUser(null);
				window.location.href = "/signin";
				return;
			}
			setShow(data);
			console.log(data);
		})();
	}, []);
	const handleDelete = async (id) => {
		const data = await deleteShow(user.user, user.token, id);
		if (data.code === 1 || data.error) {
			removeUser();
			setUser(null);
			window.location.href = "/signin";
			return;
		}
		alert("Show id " + id + " deleted successfully");
	};
	if (!user) {
		return <Navigate to="/signin" />;
	}
	const button = {
		backgroundColor: "transparent",
		border: "none",
		outline: "none",
		cursor: "pointer",
	};
	return (
		<div className="container text-center">
			<Link to="/Watchlist/create">
				<button className="btn btn-primary w-25 mt-4"> Add Show</button>
			</Link>

			{show.length == 0 && (
				<p className="text-center pt-4">You watch list is empty</p>
			)}
			{show.length > 0 && (
				<table className="table table-hover mt-4">
					<thead style={{ backgroundColor: "#5c9bbf", color: "#fff" }}>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Title</th>
							<th scope="col">Streaming App</th>
							<th scope="col">Rating</th>
							<th scope="col" style={{ maxWidth: "180px" }}>
								Review
							</th>
							<th scope="col" style={{ maxWidth: "180px" }}>
								Update
							</th>
							<th scope="col" style={{ maxWidth: "180px" }}>
								Delete
							</th>
						</tr>
					</thead>
					<tbody>
						{show.map((cur, index) => (
							<tr key={index}>
								<th scope="row">{index + 1}</th>
								<td>{cur.title}</td>
								<td>{cur.streaming_app}</td>
								<td>{cur.review}</td>
								<td>
									{[...Array(5)].map((star, index) => {
										index++;
										return (
											<button
												type="button"
												key={index}
												style={{
													...button,
													color: index <= cur.rating ? "#ffa00a" : "#ccc",
												}}
											>
												<span style={{ fontSize: "25px" }} className="star">
													&#9733;
												</span>
											</button>
										);
									})}
								</td>

								<td>
									<Link to={"/Watchlist/u/" + cur.id}>
										<button className="btn btn-primary">Update</button>
									</Link>
								</td>
								<td>
									<button
										className="btn btn-danger"
										onClick={() => handleDelete(cur.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Watchlist;
