import axios from "axios";
const blogBaseUrl = "/api/blogs";
const loginBaseUrl = "/api/login";

const getAll = (token) => {
	const request = axios.get(blogBaseUrl, {
		headers: {
			Authorization: `bearer ${token}`,
		},
	});
	return request.then((response) => response.data);
};

const createBlog = (data, token) => {
	const request = axios.post(blogBaseUrl, data, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `bearer ${token}`,
		},
	});
	return request.then((response) => response.data);
};


const loginUser = (credentials) => {
	const result = axios.post(loginBaseUrl, credentials);
	return result.then((response) => response.data);
};

const updateLikes = (token, id, data) =>{
	const request = axios.put(`${blogBaseUrl}/${id}`, data, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `bearer ${token}`,
		},
	})
	return request.then((response)=>response.data)
}

const collection = {
	getAll,
	loginUser,
	createBlog,
	updateLikes
};

export default collection;
