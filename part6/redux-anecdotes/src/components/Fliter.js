import { useRef } from "react";
import { connect } from "react-redux";
import { setFliter } from "../reducers/fliterReducer";

const Fliter = (props) => {
	const inputRef = useRef(null);

	const style = {
		marginBottom: 10,
	};

	function handleFliter() {
		const fliterValues = inputRef.current.value;
		props.setFliter(fliterValues);
	}

	return (
		<div style={style}>
			filter <input ref={inputRef} onChange={handleFliter} />
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		setFliter: (fliterValues) => {
			dispatch(setFliter(fliterValues));
		},
	};
};

export default connect(null, mapDispatchToProps)(Fliter);
