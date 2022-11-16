import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./reducers/userSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import Home from "./pages/Home";
import IndividualUser from "./components/IndividualUser";
import IndividualBlog from "./components/IndividualBlog";
import { setBlogs } from "./reducers/blogSlice";
import BlogServices from './services/blogs'

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector(state=>state.user)
	// // no login required if there's already a user in localstorage
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("loggedUserToken"));
		if (user) {
			dispatch(login(user));
			BlogServices.getAll(user.token)
			.then((blogs)=>dispatch(setBlogs(blogs)))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/users" element={<Users />} />
				<Route path="/users/:id" element={<IndividualUser />} />
				<Route path="/blogs/:id" element={<IndividualBlog />} />
			</Routes>
		</Router>
	);
};

export default App;
