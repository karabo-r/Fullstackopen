import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [user, setUser] = useState(null);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

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
	function handleTitle(e) {
		setTitle(e.target.value);
	}
	function handleAuthor(e) {
		setAuthor(e.target.value);
	}
	function handleUrl(e) {
		setUrl(e.target.value);
	}

	function handleLogout() {
		localStorage.clear();
		setIsLoggedIn(false);
	}

	function handleCreate(e) {
		e.preventDefault();
		console.log(title, author, url);

		const newBlog = {
			title,
			author,
			url,
		};

		blogService
			.createBlog(newBlog, user.token)
			.then((response) => setBlogs(blogs.concat(response)));

		setTitle("");
		setAuthor("");
		setUrl("");
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
		url,
		title,
		author,
		username,
		password,
		handleLogin,
		handleCreate,
		handleUsername,
		handlePassword,
		handleAuthor,
		handleTitle,
		handleUrl,
	};
	return (
		<div>
			{!isLoggedIn ? (
				<LoginForm {...propsCollection} />
			) : (
				<>
					<h1>blogs</h1>
					<h3>
						{user.username} has been logged in{" "}
						<button onClick={handleLogout}>logout</button>
					</h3>

					<CreateForm />

					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</>
			)}
		</div>
	);
};

export default App;
