import React from "react";
import useField from "../hooks/useField";
import { createNewBlog } from "../reducers/blogSlice";
import { useDispatch, useSelector } from "react-redux";

const CreateForm = (props) => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

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

	return (
		<form onSubmit={handleCreate}>
			<h2>Create A new blog entry</h2>
			<p>
				Title: <input {...title} />
			</p>
			<p>
				Author: <input {...author} />
			</p>
			<p>
				Url: <input {...url} />
			</p>
			<button type="submit">Create</button>
			<button onClick={() => props.setVisible(false)}>Cancel</button>
		</form>
	);
};

export default CreateForm;
