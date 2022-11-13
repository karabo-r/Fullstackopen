import React, { useState } from "react";
import CurrentUser from "./CurrentUser";
import UserServices from "../services/users";
import { useEffect } from "react";

const Users = () => {
	const [userDetails, setUserDetails] = useState([]);

	useEffect(() => {
		UserServices.getAll().then((response) => {
			setUserDetails(response);
		});
	}, []);

	console.log(localStorage);

	return (
		<>
			<CurrentUser />
			<h1>Users</h1>
			<table>
				<tr>
					<th></th>
					<th>no of blogs</th>
				</tr>
				{userDetails?.map((item) => {
					return (
						<tr>
							<td>{item.name}</td>
							<td>{item.blogs.length}</td>
						</tr>
					);
				})}
			</table>
		</>
	);
};

export default Users;
