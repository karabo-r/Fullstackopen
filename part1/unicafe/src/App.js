import { useState } from "react";
import Button from "./components/Button";
import Statistics from "./components/Statistics";

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	function setRating(setState) {
		setState((prev) => prev + 1);
	}

	const noStatistics = "No feedback given";
	const totalNumberOfRatings = good + neutral + bad;
	// average score good:1 neutral:0 bad:-1
	const averageScoreOfRatings = good - bad / totalNumberOfRatings;
	const positivePercentageOfRatings = (good / totalNumberOfRatings) * 100;

	const propsCollection = {
		good,
		neutral,
		bad,
		totalNumberOfRatings,
		averageScoreOfRatings,
		positivePercentageOfRatings,
	};
	return (
		<div>
			<h1>Give feedback</h1>
			<Button handleClick={() => setRating(setGood)} name="good" />
			<Button handleClick={() => setRating(setNeutral)} name="neutral" />
			<Button handleClick={() => setRating(setBad)} name="bad" />
			<h2>Statistics</h2>
			{totalNumberOfRatings > 0 ? (
				<Statistics {...propsCollection} />
			) : (
				noStatistics
			)}
		</div>
	);
};

export default App;
