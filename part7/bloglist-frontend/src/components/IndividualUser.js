import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrentUser from "./CurrentUser";
import UserServices from "../services/users";

const IndividualUser = () => {
	const { id } = useParams();
	const [userDetails, setUserDetails] = useState([]);

	useEffect(() => {
		UserServices.getAll().then((response) => {
			setUserDetails(response);
		});
	}, []);

	return (
		<>
			<CurrentUser />
			{userDetails?.map((item) => {
				if (item.id === id) {
					return (
						<>
							<h1>{item.name}</h1>
							<h2>Added blogs</h2>
							<ul>
								<li>{item.blogs[0].title}</li>
							</ul>
						</>
					);
				}
			})}
		</>
	);
};

export default IndividualUser;
