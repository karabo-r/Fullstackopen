import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notifications",
	initialState: { message: "Hello" ,displayStatus: false},
	reducers: {
		displayNotification: (state, action) => {
			state.message = action.payload;
			state.displayStatus = true;
		},
		removeNotification: (state, action)=>{
			state.message = '';
			state.displayStatus = false;
		}
	},
});

export const { displayNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
