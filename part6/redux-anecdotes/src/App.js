import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { asObject } from "./reducers/anecdoteReducer";

const App = () => {
	const anecdotes = useSelector((state) => state);
	const dispatch = useDispatch();

	const inputRef = useRef(null);

	const vote = (id) => {
		dispatch({ id, type: "addVote" });
	};

	const create = (e) => {
		e.preventDefault();
		const content = inputRef.current.value;
		dispatch({ type: "create", data: asObject(content) });
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
			<h2>create new</h2>
			<form onSubmit={(e) => create(e)}>
				<div>
					<input ref={inputRef} />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default App;
