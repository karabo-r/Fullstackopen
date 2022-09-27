import { createSlice } from "@reduxjs/toolkit";
import AnecdoteServices from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	};
};

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await AnecdoteServices.getAll();
		dispatch(save(anecdotes.data));
	};
};

export const saveToServer = (data) => {
	return async (dispatch) => {
		const dataToSave = asObject(data);
		await AnecdoteServices.create(dataToSave).then(() => {
			dispatch(create(dataToSave));
		});
	};
};

const anecdoteSlice = createSlice({
	name: "anecdote",
	initialState: [],
	reducers: {
		addVote: (state, action) => {
			const anecdoteToChange = state.find((item) => item.id === action.payload);
			const newAnecdoteVotes = {
				...anecdoteToChange,
				votes: anecdoteToChange.votes + 1,
			};
			return state.map((anecdote) => {
				return anecdote.id !== action.payload ? anecdote : newAnecdoteVotes;
			});
		},
		create: (state, action) => {
			state.push(action.payload);
		},
		save: (state, action) => {
			return action.payload;
		},
	},
});

export const { addVote, create, save } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
