import { useSelector, useDispatch } from "react-redux";

const AnecdoteList = () => {
	const dispatch = useDispatch();
	const anecdotes = useSelector((state) => {
		return state.sort((a, b) => b.votes - a.votes);
	});

	const vote = (id) => {
		dispatch({ id, type: "addVote" });
	};

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
