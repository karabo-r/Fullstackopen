import React from "react";
import useField from "../hooks/useField";
import BlogServices from '../services/blogs'
const CreateForm = (props) => {

	const title = useField("text")
	const author = useField("text")
	const url = useField("text")

	function handleCreate(e) {
		e.preventDefault();
		// console.log(title, author, url);

		const newBlog = {
			title: title.value,
			author: author.value,
			url: url.value,
		};

		console.log(newBlog);
		console.log(props.user.token);
		BlogServices
			.createBlog(newBlog, props.user.token)
			.then((response) => {
				props.setBlogs(props.blogs.concat(response)	);
				// setDisplayNotification(
				// 	Notifications.success(`${title} by ${author} added`),
				// );
				// displayAndRemoveNotification();
				props.setVisible(false);
			})
			.catch((error) => {
				console.log(error);
				// setDisplayNotification(Notifications.fail(error));
			});

		// setTitle("");
		// setAuthor("");
		// setUrl("");
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
