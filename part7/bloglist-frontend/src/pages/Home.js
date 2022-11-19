import React from "react";
import { useSelector } from "react-redux";
import CurrentUser from "../components/CurrentUser";
import CreateForm from "../components/CreateForm";
import Blog from "../components/Blog";
import Navigation from "../components/Navigation";
import { Container } from "@mantine/core";

const Home = () => {
	const user = useSelector((state) => state.user);

	return (
		<>
				<Navigation />
				<CurrentUser />
				{user.token && (
					<>
						<CreateForm />
						<Blog />
					</>
				)}
		</>
	);
};

export default Home;
