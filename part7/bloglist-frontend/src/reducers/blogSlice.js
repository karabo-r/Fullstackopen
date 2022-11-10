import { createSlice } from "@reduxjs/toolkit";
import BlogServices from "../services/blogs";

export function updateBlog_likes(token, blogToChange, originalBlogs) {
	return async (dispatch) => {
		const changedBlog = {
			...blogToChange,
			likes: blogToChange.likes + 1,
		};

		BlogServices.updateLikes(token, blogToChange.id, changedBlog).then(() =>
			dispatch(update({ originalBlogs, changedBlog })),
		);
	};
}

export function updateBlog_displayState(blogToChange, originalBlogs) {
	return async (dispatch) => {
		const changedBlog = {
			...blogToChange,
			displayState: !blogToChange.displayState,
		};

		dispatch(update({ originalBlogs, changedBlog }));
	};
}

export function removeBlog(token, blogToDelete, originalBlogs) {
	return async (dispatch) => {
		BlogServices.deleteBlog(token, blogToDelete, originalBlogs).then(() => {
			dispatch(remove({originalBlogs, blogToDelete}));
		});
	};
}

export function createNewBlog(data) {
	return async (dispatch) => {
		const results = await BlogServices.createBlog(data.newBlog, data.token);
		dispatch(add(results));
	};
}

const blogSlice = createSlice({
	name: "blog",
	initialState: [],
	reducers: {
		setBlogs: (state, action) => {
			return action.payload;
		},

		update: (state, action) => {
			const { originalBlogs, changedBlog } = action.payload;

			// new array wihtout current blog being modified
			const filteredArr = originalBlogs.filter((b) => b.id !== changedBlog.id);
			const newBlogs = [...filteredArr, changedBlog];
			return newBlogs.sort((a, b) => b.likes - a.likes);
		},

		remove: (state, action) => {
			const { originalBlogs, blogToDelete } = action.payload;
			const filteredArr = originalBlogs.filter((b) => b.id !== blogToDelete );
			return filteredArr;
		},

		add: (state, action) => {
			state.push(action.payload);
		},
	},
});

export const { setBlogs, update, remove, add } = blogSlice.actions;

export default blogSlice.reducer;
