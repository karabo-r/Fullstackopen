import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import {
	displayNotification,
	removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
	const dispatch = useDispatch();
	const fliterValue = useSelector((state) => state.fliter);
	// anecdotes sorted from highest votes (B-A)
	const anecdotes = useSelector((state) =>
		fliter([...state.anecdotes].sort(sortBA)),
	);

	// anecdotes sorted from highest votes (B-A)
	function sortBA(a, b) {
		return b.votes - a.votes;
	}

	function fliter(array) {
		return array.filter((item) => item.content.includes(fliterValue.value));
	}

	const vote = (id) => {
		dispatch(addVote(id));
		displayAndRemoveNotification(id);
	};

	function displayAndRemoveNotification(id) {
		const votedAnecdote = anecdotes.find((item) => item.id === id);
		const message = `you voted for ${votedAnecdote.content}`;
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
