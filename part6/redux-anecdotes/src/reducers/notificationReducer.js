import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notifications",
	initialState: { message: "Hello" ,displayStatus: false},
	reducers: {
		setNotificationMessage: (state, action) => {
			state.message = action.payload;
		},
	},
});

export const { setNotificationMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
