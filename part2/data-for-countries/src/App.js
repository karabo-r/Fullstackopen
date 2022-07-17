import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
	const [countriesData, setCountriesData] = useState([]);
	const [weatherData, setWeatherData] = useState([]);
	const [filterTerm, setFilterTerm] = useState("");
	const [newWeather, setNewWeather] = useState(false);

	const queryMessage = "Too many matches, make search query more specific";
	const handleFilterTerm = (e) => {
		setFilterTerm(e.target.value.toLowerCase());
		setWeatherData([]);
		setNewWeather(false);
	};

	function handleShowCountry(country) {
		setFilterTerm(country.toLowerCase());
	}

	const displayCountries = provideFilteredCountries();
	const weatherForCapital = provideWeather();

	function provideWeather() {
		if (displayCountries.length === 1 && !newWeather) {
			const capitalCity = displayCountries[0].capital[0].split(" ").join("&");
			const key = process.env.REACT_APP_API_KEY;
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&appid=${key}&units=metric`;
			axios.get(url).then((d) => {
				setWeatherData(d.data);
				setNewWeather(true);
			});
		}
		return weatherData;
	}

	function provideFilteredCountries() {
		return countriesData.filter((item) =>
			item.name.common.toLowerCase().includes(filterTerm),
		);
	}

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
					<button onClick={() => handleShowCountry(country.name.common)}>
						Show
					</button>
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
							<br />
							<img src={country.flags.png} />
							{newWeather && (
								<>
									<h3>Temperature {weatherForCapital.main.temp} celsuis</h3>
									<img
										style={{ height: "80px" }}
										src={`http://openweathermap.org/img/wn/${weatherForCapital.weather[0].icon}.png`}
										alt='country Flag'
									/>
									<h3>Wind {weatherForCapital.wind.speed} </h3>
								</>
							)}
						</>
					);
				})}
		</div>
	);
};

export default App;
