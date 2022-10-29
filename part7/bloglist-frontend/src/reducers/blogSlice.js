import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
	name: "blog",
	initialState: [],
	reducers: {
		setBlogs: (state, action) => {
			return action.payload;
		},
		updateBlog_likes: (state, action) => {
			// payload = id
			// const updatedBlog = {
			//     ...state,
			//     likes: blog.likes + 1,
			//   };
			// newBlogs = ...state.splice(currentIndex, 1, updatedBlog)
			// const currentIndex = blogs.indexOf(blog);
			//   blogs.splice(currentIndex, 1, updatedBlog);
		},
		deleteBlog: () => {},
		changeDisplayState: (state, action) => {
			const blogs = action.payload.blogs;
			const currentBlog = action.payload.e;
			const currentID = action.payload.e.id;

			const changeDisplay = {
				...currentBlog,
				displayState: !currentBlog.displayState,
			};

			// new array wihtout current blog being modified
			const filteredArr = blogs.filter((item) => item.id !== currentID);
			const newBlogs = [...filteredArr, changeDisplay];

			return newBlogs.sort((a, b) => b.likes - a.likes);
		},
	},
});

export const { setBlogs, updateBlog_likes, deleteBlog, changeDisplayState } =
	blogSlice.actions;

export default blogSlice.reducer;
