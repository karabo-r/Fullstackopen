import { useSelector, useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
	const anecdotes = useSelector((state) => state);
	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch({ id, type: "addVote" });
	};

	const anecdotesSortedByVotes = anecdotes.sort((a, b) => b.votes - a.votes);

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotesSortedByVotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
			<AnecdoteForm />
		</div>
	);
};

export default App;
