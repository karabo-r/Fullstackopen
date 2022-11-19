import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userSlice";
import LoginForm from "./LoginForm";

const CurrentUser = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch()

	function handleLogout(){
		dispatch(logout([]))
	}
	return (
		<div>
			{!user.token ? (
				<LoginForm />
			) : (
				<>
					<h1>Blogs</h1>
				</>
			)}
		</div>
	);
};

export default CurrentUser;
