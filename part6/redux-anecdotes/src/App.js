import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Fliter from "./components/Fliter";
import Notification from "./components/Notification";

const App = () => {
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
