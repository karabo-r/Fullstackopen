import { createSlice } from "@reduxjs/toolkit";

let notificationTimer;

export const setNotification = (message, time) => {
	clearTimeout(notificationTimer);
	return (dispatch) => {
		dispatch(displayNotification(message));

		notificationTimer = setTimeout(() => {
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
