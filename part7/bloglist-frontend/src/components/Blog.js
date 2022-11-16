import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {  removeBlog, updateBlog_displayState, updateBlog_likes } from "../reducers/blogSlice";
import BlogServices from '../services/blogs'
import { Link } from "react-router-dom";
// import orderedList from "../utils/orderList";


const Blog = () => {
	const blogs = useSelector((state) => state.blog);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();


	console.log(blogs);

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

	console.log(blogs);
	const processedBlogs = blogs?.map((item) => {
		// return (
		// 	<div key={item.id}>
		// 		{!item.displayState && showMoreDetail(item)}
		// 		{item.displayState && showLessDetail(item)}
		// 	</div>
		// );
		return <div key={item.id}>
			<Link to={`/blogs/${item.id}`}><h1>{item.title}</h1></Link>
		</div>
	});

	return <BlogList>{processedBlogs}</BlogList>;
};

const BlogList = styled.div`
	width: 500px;
	margin-left: 23px;

	h1 {
		font-size: 1.5	rem;
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
