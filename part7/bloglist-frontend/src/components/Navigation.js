import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Navigation = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	function handleLogout() {
		dispatch(logout([]));
	}
	return (
		<Container>
			{user.name && (
				<>
					<Link to={"/"}>Blogs</Link>
					<Link to={"/users"}>Users</Link>
					<p>{user.name} logged in</p>
					<button onClick={handleLogout}>Logout</button>
				</>
			)}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	height: 2rem;
	align-items: center;
	gap: 1rem;
`;
export default Navigation;
