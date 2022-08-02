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
			Authorization: `bearer ${token}`,
		},
	});
	return request.then((data) => data.data);
};
const loginUser = (credentials) => {
	const result = axios.post(loginBaseUrl, credentials);
	return result.then((response) => response.data);
};

export default { getAll, loginUser, createBlog };
