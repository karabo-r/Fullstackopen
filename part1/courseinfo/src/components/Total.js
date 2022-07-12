const Total = (props) => {
	const parts = props.parts;
	let numberOfExercises = 0;
	for (let i = 0; i < parts.length; i++) {
		numberOfExercises += parts[i].exercises;
	}

	return <p>Number of exercises {numberOfExercises}</p>;
};

export default Total;
