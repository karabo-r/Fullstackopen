import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userSlice";
import { Link } from "react-router-dom";
import { Button, Group, Text } from "@mantine/core";

const Navigation = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	function handleLogout() {
		dispatch(logout([]));
	}
	return (
		<>
			{user.name && (
				<>
					<Group spacing="xs">
						<Link to={"/"}>
							<Button variant="subtle" color="dark">
								Blogs
							</Button>
						</Link>
						<Link to={"users"}>
							<Button variant="subtle" color="dark">
								Users
							</Button>
						</Link>
						<Button onClick={handleLogout} color="dark">
							Logout
						</Button>
						<Text fz="sm">{user.name}</Text>
					</Group>
				</>
			)}
			{/* </Header> */}
		</>
	);
};

export default Navigation;
