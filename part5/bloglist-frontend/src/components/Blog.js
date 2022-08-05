import styled from "styled-components";

const Blog = ({ blogs, setBlogs }) => {
	function handleStateChange(e) {
		const currentState = e.displayState;
		const currentIndex = blogs.indexOf(e);
		const changeDisplay = {
			...e,
			displayState: !currentState,
		};
		blogs.splice(currentIndex, 1, changeDisplay);
		setBlogs([...blogs]);
	}

	function showLessDetail(item) {
		return (
			<div key={item.id}>
				<h1>
					{item.title}{" "}
					<button onClick={() => handleStateChange(item)}>Hide</button>
				</h1>
				<p>{item.url}</p>
				<p>{item.author}</p>
				<p>
					likes 0 <button>like</button>
				</p>
			</div>
		);
	}
	function showMoreDetail(item) {
		return (
			<div key={item.id}>
				<h1>
					{item.title}{" "}
					<button onClick={() => handleStateChange(item)}>View</button>
				</h1>
			</div>
		);
	}

	const processedBlogs = blogs?.map((item) => {
		return (
			<div key={item.id}>
				{item.displayState && showMoreDetail(item)}
				{!item.displayState && showLessDetail(item)}
			</div>
		);
	});

	return <BlogList>{processedBlogs}</BlogList>;
};

const BlogList = styled.div`
	width: 500px;
	margin-left: 23px;
	
	h1{
		color: rebeccapurple;
		border: 1px solid;
		padding: 6px;
	}
`;

export default Blog;
