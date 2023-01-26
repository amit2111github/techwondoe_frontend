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
					<thead
						style={{ backgroundColor: "#5c9bbf", color: "#fff" }}
					>
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
								<td>{cur.rating}</td>
								<td>{cur.review}</td>
								<td>
									<Link to={"/Watchlist/u/" + cur.id}>
										<button className="btn btn-primary">
											Update
										</button>
									</Link>
								</td>
								<td>
									<button
										className="btn btn-danger"
										onClick={(e) => handleDelete(cur.id)}
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
