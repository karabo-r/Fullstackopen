import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterWord, setFilterWord] = useState("");

	const handleFilter = (e) => setFilterWord(e.target.value);
	const handleNameChange = (e) => setNewName(e.target.value);
	const handleNumberChange = (e) => setNewNumber(e.target.value);

	const displayContacts = persons.filter((contact) =>
		contact.name.includes(filterWord),
	);

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

	function checkNameDuplicate() {
		const array = [];
		persons.map((contact) => array.push(contact.name));
		if (array.includes(newName)) return true;
		return false;
	}

	return (
		<div>
			<h1>Phonebook</h1>
			<form onSubmit={handleSubmit}>
				<h2>Add new note</h2>
				<h4>
					Filter <input value={filterWord} onChange={handleFilter} />
				</h4>
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
