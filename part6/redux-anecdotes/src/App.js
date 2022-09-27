import { useEffect } from "react";
import Fliter from "./components/Fliter";
import { useDispatch } from "react-redux";
// import { save } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeAnecdotes());
	}, [dispatch]);

	return (
		<div>
			<Notification />
			<h2>Anecdotes</h2>
			<Fliter />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	);
};

export default App;
