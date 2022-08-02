import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [user, setUser] = useState(null);

	const handleLogin = async (e) => {
		const resultToUserLogin = await blogService.loginUser({
			username,
			password,
		});
		//save the users credentials to localstorage
		window.localStorage.setItem(
			"loggedUserToken",
			JSON.stringify(resultToUserLogin),
		);
		// update user
		setUser(resultToUserLogin);
		setIsLoggedIn(true);
		setUsername("");
		setPassword("");
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	function handleUsername(e) {
		setUsername(e.target.value);
	}

	function handleLogout(){
		localStorage.clear()
		setIsLoggedIn(false)
	}

	// no login required if there's already a user in localstorage

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("loggedUserToken"));
		if (user) {
			setUser(user);
			setIsLoggedIn(true);
			blogService.getAll(user.token).then((data) => setBlogs(data));
		}
	}, []);

	const propsCollection = {
		username,
		password,
		handleLogin,
		handleUsername,
		handlePassword,
	};
	return (
		<div>
			{!isLoggedIn ? (
				<LoginForm {...propsCollection} />
			) : (
				<>
					<h2>blogs</h2>
					<h3>{user.username} has been logged in <button onClick={handleLogout}>logout</button></h3> 
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</>
			)}
		</div>
	);
};

export default App;
