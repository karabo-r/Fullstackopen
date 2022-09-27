import { createSlice } from "@reduxjs/toolkit";

export const setNotification = (message, time) => {
	return (dispatch) => {
		console.log(message);
		dispatch(displayNotification(message));
		setTimeout(() => {
			dispatch(removeNotification());
		}, time);
	};
};

const notificationSlice = createSlice({
	name: "notifications",
	initialState: { message: "Hello", displayStatus: false },
	reducers: {
		displayNotification: (state, action) => {
			state.message = action.payload;
			state.displayStatus = true;
		},
		removeNotification: (state, action) => {
			state.message = "";
			state.displayStatus = false;
		},
	},
});

export const { displayNotification, removeNotification } =
	notificationSlice.actions;
export default notificationSlice.reducer;
