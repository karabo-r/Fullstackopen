import { useEffect, useState } from "react";
import axois from "axios";

const App = () => {
	const [data, setData] = useState([]);
	const [filterTerm, setFilterTerm] = useState("");

	const handleFilterChange = (e) => setFilterTerm(e.target.value);

	function fetchData() {
		axois.get("https://restcountries.com/v3.1/all").then((response) => {
			setData(response.data);
			// console.log(data);
		});
	}

	// useEffect(()=>fetchData,[])

	return (
		<div>
			<h4>
				Find Country <input value={filterTerm} onChange={handleFilterChange} />
			</h4>
		</div>
	);
};

export default App;
