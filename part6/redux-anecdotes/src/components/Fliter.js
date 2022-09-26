import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setFliter } from "../reducers/fliterReducer";

const Fliter = () => {
	const dispatch = useDispatch();
	const inputRef = useRef(null);

	const style = {
		marginBottom: 10,
	};

	function handleFliter() {
		const fliterValues = inputRef.current.value;
		dispatch(setFliter(fliterValues));
	}

	return (
		<div style={style}>
			filter <input ref={inputRef} onChange={handleFliter} />
		</div>
	);
};

export default Fliter;
