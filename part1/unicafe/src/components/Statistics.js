import StatisticLine from "./StatisticLine";

const Statistics = (props) => {
	return (
		<>
			<StatisticLine name="good" value={props.good} />
			<StatisticLine name="neutral" value={props.neutral} />
			<StatisticLine name="bad" value={props.bad} />

			<h2>All: {props.totalNumberOfRatings} </h2>
			<h2>Average: {props.averageScoreOfRatings} </h2>
			<h2>Positive: {props.positivePercentageOfRatings} </h2>
		</>
	);
};

export default Statistics;
