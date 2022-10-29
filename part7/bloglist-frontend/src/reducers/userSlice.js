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
      return action.payload
      // console.log("asdfs");
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
