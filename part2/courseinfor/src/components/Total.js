const Total = (props) => {
	const parts = props.parts;
	const numberOfExercises = parts.reduce((total, item) => {
		return (total += item.exercises);
	}, 0);

	return <h2>Number of exercises {numberOfExercises}</h2>;
};

export default Total;
