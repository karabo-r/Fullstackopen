import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import Notifications from "./utils/Notifications";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [user, setUser] = useState(null);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");
	const [displayNotification, setDisplayNotification] = useState("");
	const [isDisplayNotification, setIsDisplayNotification] = useState(false);
	const [visible, setVisible] = useState(false);

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
		setUser(null);
	}

	const handleLogin = async (e) => {
		try {
			const resultToUserLogin = await blogService.loginUser({
				username,
				password,
			});

			console.log(resultToUserLogin);
			//save the users credentials to localstorage
			window.localStorage.setItem(
				"loggedUserToken",
				JSON.stringify(resultToUserLogin),
			);
			// update user
			setUser(resultToUserLogin);
			setUsername("");
			setPassword("");
		} catch (error) {
			const message = error.response.data.error;
			setDisplayNotification(Notifications.fail(message));
			displayAndRemoveNotification();
		}
		setUsername("");
		setPassword("");
	};

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
			.then((response) => {
				setBlogs(blogs.concat(response));
				setDisplayNotification(
					Notifications.success(`${title} by ${author} added`),
				);
				displayAndRemoveNotification();
				setVisible(false);
			})
			.catch((error) => {
				setDisplayNotification(Notifications.fail(error));
			});

		setTitle("");
		setAuthor("");
		setUrl("");
	}

	// no login required if there's already a user in localstorage
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("loggedUserToken"));
		if (user) {
			setUser(user);
			console.log(user);
			blogService.getAll(user.token).then((data) => {
				data.forEach(element => {
					// used for displaying more details 
					element.displayState = false
				});
				setBlogs(data)
			});
		}
	}, []);

	function displayAndRemoveNotification() {
		setIsDisplayNotification(true);
		setTimeout(() => {
			setIsDisplayNotification(false);
		}, 5000);
	}

	const propsCollection = {
		url,
		title,
		blogs,
		author,
		username,
		password,
		setVisible,
		setBlogs,
		handleUrl,
		handleLogin,
		handleTitle,
		handleCreate,
		handleAuthor,
		handleUsername,
		handlePassword,
	};

	const hideWhenVisble = { display: visible ? "none" : "" };
	return (
		<div>
			{isDisplayNotification && displayNotification}
			{user === null ? (
				<LoginForm {...propsCollection} />
			) : (
				<>
					<h1>blogs</h1>
					<h2>Hello, {user.username}</h2>
					<button onClick={handleLogout}>logout</button> <br />
					<div style={hideWhenVisble}>
						<button onClick={() => setVisible(true)}>new blog</button>
					</div>
					{visible && <CreateForm {...propsCollection} />}
					<Blog {...propsCollection} />
				</>
			)}
		</div>
	);
};

export default App;
