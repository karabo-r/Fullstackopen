import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./reducers/userSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import Home from "./pages/Home";
import IndividualUser from "./components/IndividualUser";

const App = () => {
	const dispatch = useDispatch();

	// // no login required if there's already a user in localstorage
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("loggedUserToken"));
		if (user) {
			dispatch(login(user));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/users" element={<Users />} />
				<Route path="/users/:id" element={<IndividualUser />} />
			</Routes>
		</Router>
	);
};

export default App;
