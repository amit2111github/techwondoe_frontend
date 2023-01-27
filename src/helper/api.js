const url = process.env.REACT_APP_BACKEND_URL;
export const userLogin = (email, password) => {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		email,
		password,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(url + "signin", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops something went wrong"));
};

export const userSignup = (name, email, password) => {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		name,
		email,
		password,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(url + "signup", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops something went wrong"));
};

export const getShowList = (user, token) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({ id: user.id });

	var requestOptions = {
		method: "post",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(url + "watchlist/", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => console.log(error));
};

export const addShow = (user, token, title, streamingApp, review, rating) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		title,
		streaming_app: streamingApp,
		rating,
		review,
		user_id: user.id,
		id: user.id,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(url + "watchlist/create", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => error);
};

export const getShow = (user, token, showId) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: user.id,
		show_id: +showId,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(url + "watchlist/id", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => error);
};

export const updateShow = (
	user,
	token,
	title,
	streamingApp,
	review,
	rating,
	showId
) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		title: title,
		streaming_app: streamingApp,
		review: review,
		rating: rating,
		id: user.id,
		watchlist_id: showId,
	});

	var requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(url + "watchlist/", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops something went wrong"));
};

export const deleteShow = (user, token, showId) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		watchlist_id: showId,
		id: user.id,
	});

	var requestOptions = {
		method: "DELETE",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(url + "watchlist/", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops something went wrong"));
};
