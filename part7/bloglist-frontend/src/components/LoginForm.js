import React from "react";
import useNotification from "../hooks/useNotification";
import BlogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userSlice";
import useField from "../hooks/useField";

function LoginForm() {
	const notification = useNotification();
	const username = useField("text");
	const password = useField("password");

	const dispatch = useDispatch();

	const handleLogin = async (e) => {
		e.preventDefault();
    
		try {
			const resultToUserLogin = await BlogService.loginUser({
				username: username.value,
				password: password.value,
			});

			//save the users credentials to localstorage
			window.localStorage.setItem(
				"loggedUserToken",
				JSON.stringify(resultToUserLogin),
			);

			dispatch(login(resultToUserLogin));
		} catch (error) {
			notification.custom(`${error}`);
		}
	};

	return (
		<>
			{notification.display && notification.message}
			<h1>Please Login</h1>
			<form onSubmit={handleLogin}>
				<h3>
					username <input {...username} />
				</h3>
				<h3>
					password <input {...password} />
				</h3>
				<button type="submit">Login</button>
			</form>
		</>
	);
}

export default LoginForm;
