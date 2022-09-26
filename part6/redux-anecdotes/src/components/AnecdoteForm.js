import { useRef } from "react";
import { useDispatch } from "react-redux";
import { asObject } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch();
	const inputRef = useRef(null);

	const create = (e) => {
		e.preventDefault();
		const content = inputRef.current.value;
		dispatch({ type: "create", data: asObject(content) });
	};

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={(e) => create(e)}>
				<div>
					<input ref={inputRef} />
				</div>
				<button type="submit">create</button>
			</form>
		</>
	);
};

export default AnecdoteForm;
