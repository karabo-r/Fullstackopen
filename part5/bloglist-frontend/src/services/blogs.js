import axios from "axios";
const blogBaseUrl = "/api/blogs";
const loginBaseUrl = "/api/login";

// let token = null

// const setToken = token =>{
//   token = `bearer ${token}`
// }

// const config = {
//   headers: { Authorization: token },
// }

const getAll = (token) => {
	const request = axios.get(blogBaseUrl, {
		headers: {
			Authorization: `bearer ${token}`,
		},
	});
	return request.then((response) => response.data);
};

const loginUser = (credentials) => {
	const result = axios.post(loginBaseUrl, credentials);
	return result.then((response) => response.data);
};

export default { getAll, loginUser };
