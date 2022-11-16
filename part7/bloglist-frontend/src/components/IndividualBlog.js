import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserServices from "../services/users";
import CurrentUser from "./CurrentUser";
import Navigation from "./Navigation";
const IndividualBlog = () => {
	const [blogDetails, setBlogDetails] = useState([]);
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

	return (
		<>
			<Navigation />
			<CurrentUser />
			{processedBlog}
			<h2>comments</h2>
			{processedComments}
		</>
	);
};

export default IndividualBlog;
