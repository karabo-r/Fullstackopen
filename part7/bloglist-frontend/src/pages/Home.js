import React from "react";
import { useSelector } from "react-redux";
import CurrentUser from "../components/CurrentUser";
import CreateForm from "../components/CreateForm";
import Blog from "../components/Blog";

const Home = () => {
	const user = useSelector((state) => state.user);

	return (
		<>
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
