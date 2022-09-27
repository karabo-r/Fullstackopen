import { createSlice } from "@reduxjs/toolkit";



const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	};
};

// const initialState = anecdotesAtStart.map(asObject);
// const initialState = []

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
			state.push(action.payload)
		},
		save: (state, action) => {
			return action.payload
		},
	},
});

export const { addVote, create, save } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

