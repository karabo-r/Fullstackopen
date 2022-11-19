import React, { useState } from "react";
import useField from "../hooks/useField";
import { createNewBlog } from "../reducers/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Group, Space, Stack, TextInput } from "@mantine/core";

const CreateForm = (props) => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [isVisible, setIsVisible] = useState(false);
	const title = useField("text");
	const author = useField("text");
	const url = useField("text");

	async function handleCreate(e) {
		e.preventDefault();

		const newBlog = {
			title: title.value,
			author: author.value,
			url: url.value,
		};

		const data = {
			newBlog,
			token: user.token,
		};

		dispatch(createNewBlog(data));

		// BlogServices.createBlog(newBlog,props.user.token)
		// 	.then((response) => {
		// 		props.setBlogs(props.blogs.concat(response));
		// 		// setDisplayNotification(
		// 		// 	Notifications.success(`${title} by ${author} added`),
		// 		// );
		// 		// displayAndRemoveNotification();
		// 	})
		props.setVisible(false);
		// 	.catch((error) => {
		// 		console.log(error);
		// 		// setDisplayNotification(Notifications.fail(error));
		// 	});
	}

	function handleSetIsVisible() {
		setIsVisible((prev) => !prev);
	}

	return (
		<>
			{isVisible && (
				<form onSubmit={handleCreate}>
					<h2>Create A new blog entry</h2>
					<Stack sx={{ maxWidth: 300 }}>
						<TextInput label="Title" {...title} />
						<TextInput label="Author" {...author} />
						<TextInput label="URL" {...url} />
					</Stack>

					<Space h="md" />
					<Group>
						<Button type="submit" color={"dark"}>
							Create
						</Button>
						<Button onClick={handleSetIsVisible} color="dark">
							Cancel
						</Button>
					</Group>
				</form>
			)}
			{!isVisible && (
				<>
					<Button onClick={handleSetIsVisible} color="dark">
						Create New Note
					</Button>
					<Space h="sm" />
				</>
			)}
		</>
	);
};

export default CreateForm;
