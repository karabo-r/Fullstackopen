import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
	const [countriesData, setCountriesData] = useState([]);
	const [filterTerm, setFilterTerm] = useState("");

	const queryMessage = "Too many matches, make search query more specific";
	const handleFilterTerm = (e) => {
		setFilterTerm(e.target.value.toLowerCase());
	};
	function handleShowCountry(country){
		setFilterTerm(country.toLowerCase())
	}

	const displayCountries = provideFilteredCountries();
	// const languagesInCountry = provideLanguages()

	function provideFilteredCountries() {
		return countriesData.filter((item) =>
			item.name.common.toLowerCase().includes(filterTerm),
		);
	}

	function provideLanguages() {
		let arrayOfLanguages = [];
		const path = displayCountries[0].languages
		if (path) {
			for(const key of Object.keys(path)){
				arrayOfLanguages.push(path[key])
			}
		}
	return arrayOfLanguages
	}

	// console.log(provideLanguages());


	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			setCountriesData(response.data);
		});
	}, []);

	return (
		<div>
			<h1>
				Find Country <input value={filterTerm} onChange={handleFilterTerm} />
			</h1>
			{displayCountries.length > 10 && filterTerm && <h3>{queryMessage}</h3>}
			{displayCountries.map((country) => (
				<div>
				{country.name.common}
				<button onClick={()=>handleShowCountry(country.name.common)}>Show</button>
				</div>
			))}
			{displayCountries.length === 1 &&
				displayCountries.map((country) => {
					return (
						<>
							<h1>{country.name.common}</h1>
							<p>Capital city: {country.capital}</p>
							<p>Area: {country.area}</p>
							<h3>Languages</h3>
							{/* {languagesInCountry.map(language=><li>{language}</li>)} */}
							<br/>
							<img src={country.flags.png} />
						</>
					);
				})}
		</div>
	);
};

export default App;
