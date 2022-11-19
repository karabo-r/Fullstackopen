import React, { useState } from "react";
import CurrentUser from "./CurrentUser";
import UserServices from "../services/users";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "./Navigation";
import { Container, Table } from "@mantine/core";

const Users = () => {
	const [userDetails, setUserDetails] = useState([]);

	useEffect(() => {
		UserServices.getAll().then((response) => {
			setUserDetails(response);
		});
	}, []);

	const { userID } = useParams();

	return (
		<>
			<Navigation />
			{/* <CurrentUser /> */}
			<Container>
				{userID !== 0 && (
					<>
						<h1>Users</h1>
						<Table verticalSpacing="xs">
							<tr>
								<th></th>
								<th>no of blogs</th>
							</tr>
							{userDetails?.map((item) => {
								return (
									<tr>
										<Link to={`/users/${item.id}`}>
											<td>{item.name}</td>
										</Link>
										<td>{item.blogs.length}</td>
									</tr>
								);
							})}
						</Table>
					</>
				)}
			</Container>
		</>
	);
};

export default Users;
