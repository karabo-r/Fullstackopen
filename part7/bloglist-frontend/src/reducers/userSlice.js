import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

export const userSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		login: (state, action) => {
			return action.payload;
		},

		logout: (state, action) => {
			localStorage.clear();
			return action.payload;
		},
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
