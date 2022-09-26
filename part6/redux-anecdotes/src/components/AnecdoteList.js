import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
	const dispatch = useDispatch();
	// anecdotes sorted from highes votes (B-A)
	const anecdotes = useSelector((state) =>
		[...state.anecdotes].sort((a, b) => b.votes - a.votes),
	);

	const vote = (id) => dispatch(addVote(id));

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
