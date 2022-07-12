const Total = (props) => {
	const parts = props.parts;
	const numberOfExercises = parts.reduce((total, item)=>{
		return total += item.exercises
	},0)

	return <p>Number of exercises {numberOfExercises}</p>;
};

export default Total;
