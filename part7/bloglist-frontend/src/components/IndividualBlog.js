import { Button, Group, TextInput } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useField from "../hooks/useField";
import UserServices from "../services/users";
import CurrentUser from "./CurrentUser";
import Navigation from "./Navigation";
const IndividualBlog = () => {
	const [blogDetails, setBlogDetails] = useState([]);
	const { token } = useSelector((state) => state.user);
	const comment = useField("text");
	// who added the blog

	useEffect(() => {
		UserServices.getAll().then((r) => setBlogDetails(r));
	}, []);

	const { id } = useParams();

	const processedBlog = blogDetails?.map((item) => {
		return item.blogs?.map((blog) => {
			// console.log(blog);
			if (blog.id === id) {
				return (
					<div key={blog.id}>
						<h1>
							{blog.title} {blog.author}
						</h1>
						<a href={blog.url}>{blog.url}</a>

						<p>
							{blog.likes ? blog.likes : 0} likes <br />
							Added by {item.name}
						</p>
					</div>
				);
			}
		});
	});

	const processedComments = blogDetails?.map((item) => {
		return item.blogs?.map((blog) => {
			if (blog.id === id) {
				return blog.comments.map((comment) => <li>{comment}</li>);
			}
		});
	});

	async function handleNewComment(e) {
		e.preventDefault();
		// console.log(comment.value);
		const newComments = [];

		// save pre-existing comments
		blogDetails?.map((item) => {
			item.blogs?.map((blog) => {
				blog.comments.map((c) => newComments.push(c));
			});
		});

		// add new comment to pre-existing ones
		newComments.push(comment.value);

		const newUpdate = {
			comments: newComments,
		};

		// store comments to backend
		await axios
			.put(`/api/blogs/${id}`, newUpdate, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `bearer ${token}`,
				},
			})
			.then(() => console.log("working"));

	}

	return (
		<>
			<Navigation />
			{/* <CurrentUser /> */}
			{processedBlog}
			<h2>comments</h2>
			<div style={{ display: "flex" }}>
				<form onSubmit={(e) => handleNewComment(e)}>
					<Group>

					{/* <input {...comment} /> */}
					<TextInput {...comment}/>
					<Button color={"dark"} type="submit">Add comment</Button>
					</Group>
				</form>
			</div>
			<br />
			{processedComments}
		</>
	);
};

export default IndividualBlog;
