import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import {
	displayNotification,
	removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
	const dispatch = useDispatch();
	// anecdotes sorted from highes votes (B-A)
	const anecdotes = useSelector((state) =>
		[...state.anecdotes].sort((a, b) => b.votes - a.votes),
	);

	// add new vote and display notification
	const vote = (id) => {
		dispatch(addVote(id));
		displayAndRemoveNotification(id);
	};

	function displayAndRemoveNotification(id) {
		const votedAnecdote =  anecdotes.find(item=>item.id === id)
		const message = `you voted for ${votedAnecdote.content}`
		dispatch(displayNotification(message));
		setTimeout(() => {
			dispatch(removeNotification());
		}, 5000);
	}

	return (
		<>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</>
	);
};

export default AnecdoteList;
