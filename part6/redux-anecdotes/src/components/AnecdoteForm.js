import { useRef } from "react";
import { connect } from "react-redux";
import { saveToServer } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
	const inputRef = useRef(null);

	const createNewAnecdote = (e) => {
		e.preventDefault();
		const content = inputRef.current.value;
		props.saveToServer(content);
		props.setNotification(content);
	};

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

const mapDispatchToProps = (dispatch) => {
	return {
		setNotification: (message) => {
			dispatch(setNotification(`you added '${message}'`, 5000))
		},
		saveToServer: (content) =>{
			dispatch(saveToServer(content))
		}
	};
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
