import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asObject, create } from "../reducers/anecdoteReducer";
import {
	displayNotification,
	removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
	const anecdotes = useSelector((state) => state.anecdotes);
	const dispatch = useDispatch();
	const inputRef = useRef(null);

	const createNewAnecdote = (e) => {
		console.log(anecdotes);
		e.preventDefault();
		const content = inputRef.current.value;
		dispatch(create(asObject(content)));
		displayAndRemoveNotification(content);
	};

	function displayAndRemoveNotification(content) {
		const message = `you added ${content}`;
		dispatch(displayNotification(message));
		setTimeout(() => {
			dispatch(removeNotification());
		}, 5000);
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={(e) => createNewAnecdote(e)}>
				<div>
					<input ref={inputRef} />
				</div>
				<button type="submit">create</button>
			</form>
		</>
	);
};

export default AnecdoteForm;
