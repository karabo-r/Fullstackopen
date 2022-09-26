import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import fliterReducer from "./reducers/fliterReducer";
import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
	fliter: fliterReducer,
	anecdotes: anecdoteReducer,
	notifications: notificationReducer,
});

const store = configureStore({
	reducer,
});

export default store;
