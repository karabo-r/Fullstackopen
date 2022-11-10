import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {  removeBlog, updateBlog_displayState, updateBlog_likes } from "../reducers/blogSlice";
import BlogServices from '../services/blogs'
// import orderedList from "../utils/orderList";


const Blog = () => {
	const blogs = useSelector((state) => state.blog);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();


	// function updateLikesInBlog(blog) {
	//   const id = blog.id;
	//   const updatedBlog = {
	//     ...blog,
	//     likes: blog.likes + 1,
	//   };

	//   // update ui without calling api for rerender
	//   const currentIndex = blogs.indexOf(blog);
	//   blogs.splice(currentIndex, 1, updatedBlog);
	//   setBlogs([...blogs]);

	//   // update likes on database
	//   BlogsServices.updateLikes(user.token, id, updatedBlog);
	// }

	// function deleteBlog(blog) {
	//   const id = blog.id;
	//   const currentIndex = blogs.indexOf(blog);
	//   const confirmMessage = `Remove blog ${blog.title} by ${blog.author}`;
	//   if (window.confirm(confirmMessage)) {
	//     blogs.splice(currentIndex, 1);
	//     setBlogs([...blogs]);
	//     BlogsServices.deleteBlog(user.token, id);
	//   } else {
	//     return;
	//   }
	// }


	function updateDisplayState(e) {
		dispatch(updateBlog_displayState( e, blogs ));
	}
	
	function updateBlogLikes(e) {
		dispatch(updateBlog_likes(user.token, e, blogs));
	}
	
	function handleDeleteBlog(e) {
		dispatch(removeBlog( user.token, e.id, blogs ));
	}

	function showLessDetail(item) {
		return (
			<div key={item.id}>
				<h1>
					{item.title}{" "}
					<button onClick={() => updateDisplayState(item)}>Hide</button>
				</h1>
				<p>{item.url}</p>
				<p>{item.author}</p>
				<p>
					likes {item.likes}{" "}
					<button onClick={() => updateBlogLikes(item)}>like</button>
				</p>
				<button onClick={() => handleDeleteBlog(item)}>Delete</button>
			</div>
		);
	}
	function showMoreDetail(item) {
		return (
			<div key={item.id}>
				<h1>
					{item.title}{" "}
					<button onClick={() => updateDisplayState(item)}>View</button>
				</h1>
				<p>{item.author}</p>
			</div>
		);
	}

	const processedBlogs = blogs?.map((item) => {
		return (
			<div key={item.id}>
				{!item.displayState && showMoreDetail(item)}
				{item.displayState && showLessDetail(item)}
			</div>
		);
	});

	return <BlogList>{processedBlogs}</BlogList>;
};

const BlogList = styled.div`
	width: 500px;
	margin-left: 23px;

	h1 {
		color: rebeccapurple;
		border: 1px solid;
		padding: 6px;
	}
`;

// Blog.propTypes = {
// 	user: PropTypes.object.isRequired,
// 	blogs: PropTypes.array.isRequired,
// 	setBlogs: PropTypes.func.isRequired
// }

export default Blog;
