const Blog = ({ blogs}) => (
	<ul>
		{blogs.map((blog) => {
			return <li key={blog.id}>{blog.title}</li>;
		})}
	</ul>
);

export default Blog;
