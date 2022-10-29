import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import BlogServices from "./services/blogs";
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import useField from "./hooks/useField";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "./reducers/userSlice";
import { setBlogs } from "./reducers/blogSlice";
// import { initializeBlogs } from "./reducers/blogSlice";

const App = () => {
	const [visible, setVisible] = useState(false);
	/// not states
	const username = useField("text");
	const password = useField("password");

	const user = useSelector((state) => state.user);
	// const blogs = useSelector((state) => state.blog);
	const dispatch = useDispatch();

	const handleLogout = () => {
		localStorage.clear();
		dispatch(logout([]));
		console.log(user);
	};

	async function getBlogs() {
		const data = await BlogServices.getAll(user.token);
		// .then((data) => {
		data.forEach((element) => {
			// used for displaying more details
			element.displayState = false;
		});
		// sort blogs by highest likes
		dispatch(setBlogs(data.sort((a, b) => b.likes - a.likes)));
		// dispatch(setBlogs(getBlogs()))
		// });
	}

	// no login required if there's already a user in localstorage
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("loggedUserToken"));
		if (user) {
			console.log("user found");
			dispatch(login(user));
		} else {
			console.log("user not found");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (user.token) {
			getBlogs();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, user]);

	const hideWhenVisble = { display: visible ? "none" : "" };

	const propsCollection_LoginForm = {
		// handleSetUser,
		username,
		password,
	};

	const propsCollection_CreateForm = {
		setVisible,
		user,
		// setBlogs,
		// blogs,
	};
	//username : joey
	//password : password

	// states {
	// - user
	// - blogs
	// }

	return (
		<div>
			{!user.token ? (
				<LoginForm {...propsCollection_LoginForm} />
			) : (
				<>
					<h1>blogs</h1>
					<h2>Hello, {user.username}</h2>
					<button onClick={handleLogout}>logout</button> <br />
					<div style={hideWhenVisble}>
						<button onClick={() => setVisible(true)}>new blog</button>
					</div>
					{visible && <CreateForm {...propsCollection_CreateForm} />}
					<Blog />
				</>
			)}
		</div>
	);
};

export default App;
