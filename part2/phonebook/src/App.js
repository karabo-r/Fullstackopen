import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import ContactServices from './services/contacts'

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterWord, setFilterWord] = useState("");

	const handleFilter = (e) => setFilterWord(e.target.value.toLowerCase());
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

			if (!checkNameDuplicate()) {
				ContactServices
				.createContact(newEntry)
				setPersons(persons.concat(newEntry))
			}else{

				alert(`${newName} is already added to the phonebook`);
			}
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

	function handleDelete(id){
		ContactServices
		.deleteContact(id)
		.then(fetchData)
	}

	function fetchData(){
		ContactServices
		.getAll()
		.then(response=>setPersons(response.data))
	}
	
	useEffect(fetchData,[])

	const propsCollection = {
		newName,
		newNumber,
		filterWord,
		setNewName,
		setNewNumber,
		setFilterWord,
		handleNameChange,
		handleNumberChange,
		handleFilter,
		handleSubmit,
		handleDelete,
		displayContacts
	}

	return (
		<div>
			<h1>Phonebook</h1>
			<Filter {...propsCollection}/>
			<h2>Add new note</h2>
			<PersonForm {...propsCollection}/>
			<h2>Numbers</h2>
			<Persons {...propsCollection}/>
		</div>
	);
};

export default App;
