import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [showAll, setShowAll] = useState(true);

	const handleNameChange = (e) => setNewName(e.target.value);
	const handleNumberChange = (e) => setNewNumber(e.target.value);


	
	
	// const personsEntryArray = changeObjectToArray(persons);
	const personsEntryArray = changeObjectToArray(persons);
	


	function handleSubmit(e) {
		e.preventDefault();
		if (newName || newNumber) {
			const newEntry = {
				id: persons.length + 1,
				name: newName || "no name",
				number: newNumber || "no number",
			};

			!checkNameDuplicate()
				? setPersons(persons.concat(newEntry))
				: alert(`${newName} is already added to the phonebook`);
		}

		setNewName("");
		setNewNumber("");
	}

	function changeObjectToArray(objectToChange) {
		let array = [];
		for (const key in Object.keys(objectToChange)) {
			array.push(persons[key]);
		}
		return array;
	}

	function handleFilter(e) {
		e.preventDefault();
		if (e.target.value) {
			setShowAll(false);
			setFilter(e.target.value);
		}
		// setShowAll(true)
	}

	function checkNameDuplicate() {
		let nameArray = [];
		personsEntryArray.map((item) => nameArray.push(item.name));
		if (nameArray.includes(newName)) return true;
		else return false;
	}

	return (
		<div>
			<h1>Phonebook</h1>
			<h3>
				Filter entries <input value={filter} onChange={handleFilter} />
			</h3>
			<h2>Add new note</h2>
			<form onSubmit={handleSubmit}>
				<h4>
					name: <input value={newName} onChange={handleNameChange} />
				</h4>
				<h4>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</h4>
				<button type="submit">Add</button>
			</form>
			<h2>Numbers</h2>
			{displayContacts?.map((data) => {
				return (
					<li key={data.id}>
						{data.name} {data.number}
					</li>
				);
			})}
		</div>
	);
};

export default App;
