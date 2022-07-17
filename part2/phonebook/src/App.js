import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import ContactServices from "./services/contacts";
import NotificationMessages from "./utils/notificationMessages";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterWord, setFilterWord] = useState("");
	const [notification, setNotification] = useState('')
	const [isDisplayNotification, setIsDisplayNotification] = useState(false)
	
	const handleFilter = (e) => setFilterWord(e.target.value.toLowerCase());
	const handleNameChange = (e) => setNewName(e.target.value);
	const handleNumberChange = (e) => setNewNumber(e.target.value);

	const displayContacts = filterName(filterWord);


	function handleSubmit(e) {
		e.preventDefault();
		if (newName || newNumber) {
			const newEntry = {
				id: persons.length + 1,
				name: newName || "no name",
				number: newNumber || "no number",
			};

			if (!checkNameDuplicate()) {
				ContactServices.createContact(newEntry)
				.then(setIsDisplayNotification(true))
				setNotification(NotificationMessages.newContactAdded(newName))
				NotificationMessages.removeNotification(setIsDisplayNotification)
				setPersons(persons.concat(newEntry));
			}
			if (checkNameDuplicate() && newEntry.number !== "no number") {
				replaceOldNumberWithNew();
			} 
			if(!checkNameDuplicate){
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

	function handleDelete(id) {
		const contact = filterId(id)
		if (window.confirm(`Delete ${contact[0].name}`)) {
			ContactServices.deleteContact(id)
			.then(
				fetchData,
				setIsDisplayNotification(true),
				setNotification(NotificationMessages.contactDeletedSuccess(contact[0].name)),
				NotificationMessages.removeNotification(setIsDisplayNotification)
			)
			.catch(
				setIsDisplayNotification(true),
				setNotification(NotificationMessages.contactDeleteFail(contact[0].name)),
				NotificationMessages.removeNotification(setIsDisplayNotification)

			)
		}
	}

	function fetchData() {
		ContactServices.getAll().then((response) => setPersons(response.data));
	}

	function replaceOldNumberWithNew() {
		const message = `${newName} is already added to the phonebook, replace the old number with the new one`;
		if (window.confirm(message)) {
			const contact = filterName(newName);
			const id = contact[0].id;
			const changedContactNumber = {
				...contact[0],
				number: newNumber,
			};
			ContactServices.updateContactNumber(id, changedContactNumber).then(
				fetchData,
				setIsDisplayNotification(true),
				setNotification(NotificationMessages.contactNumberUpdated(contact[0].name)),
				NotificationMessages.removeNotification(setIsDisplayNotification),
			);
		}
	}

	function filterName(term) {
		return persons.filter((contact) => contact.name.includes(term));
	}
	
	function filterId(id) {
		return persons.filter((contact) => contact.id === id);
	}

	useEffect(fetchData, []);

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
		displayContacts,
	};

	return (
		<div>
			{isDisplayNotification && notification}
			<h1>Phonebook</h1>
			<Filter {...propsCollection} />
			<h2>Add new note</h2>
			<PersonForm {...propsCollection} />
			<h2>Numbers</h2>
			<Persons {...propsCollection} />
		</div>
	);
};

export default App;
