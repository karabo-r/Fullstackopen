import { useEffect, useState } from "react";
import axios from 'axios'

const App = () => {
	
	const [countriesData, setCountriesData] = useState([])
	const [filterTerm, setFilterTerm] = useState('')

	const handleFilterTerm = (e) => {setFilterTerm(e.target.value)}
	const displayCountries = countriesData.filter(item=>item.name.common.toLowerCase().includes(filterTerm))

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountriesData(response.data)
      })
  }, [])

	return <div>
		<h1>Find Country <input value={filterTerm} onChange={handleFilterTerm}/></h1>
		{displayCountries.map(country=><li>{country.name.common}</li>)}
	</div>;
};

export default App;
