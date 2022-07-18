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
	const [notification, setNotification] = useState("");
	const [isDisplayNotification, setIsDisplayNotification] = useState(false);

	const handleFilter = (e) => setFilterWord(e.target.value.toLowerCase());
	const handleNameChange = (e) => setNewName(e.target.value);
	const handleNumberChange = (e) => setNewNumber(e.target.value);

	const filterName = (term) => persons.filter((contact) => contact.name.includes(term));
	const filterId = (id) => persons.filter((contact) => contact.id === id);

	const displayContacts = filterName(filterWord);

	const fetchData = () => {
		ContactServices.getAll().then((response) => setPersons(response.data));
	}

	const displayAndRemoveNotification = () =>{
		setIsDisplayNotification(true)
		removeNotifications()
	}

	const removeNotifications = () => {
		setTimeout(() => {
			setIsDisplayNotification(false);
		}, 4000);
	}

	function checkNameDuplicate() {
		const array = [];
		persons.map((contact) => array.push(contact.name));
		if (array.includes(newName)) return true;
		return false;
	}

	// create a new contact
	const handleSubmit = (e) => {
		e.preventDefault();
		if (newName || newNumber) {
			const newEntry = {
				id: persons.length + 1,
				name: newName || "no name",
				number: newNumber || "no number",
			};

			if (!checkNameDuplicate()) {
				ContactServices.createContact(newEntry).then(
					setIsDisplayNotification(true),
				);
				setPersons(persons.concat(newEntry));
				setNotification(NotificationMessages.newContactAdded(newName))
				removeNotifications()
			}
			if (checkNameDuplicate() && newEntry.number !== "no number") {
				replaceOldNumberWithNew();
			}
			if (!checkNameDuplicate) {
				alert(`${newName} is already added to the phonebook`);
			}
		}

		setNewName("");
		setNewNumber("");
	}

	// delete a contact
	const handleDelete = (id) => {
		const contact = filterId(id);
		const name = contact[0].name
		if (window.confirm(`Delete ${name}`)) {
			ContactServices.deleteContact(id)
				.then(
					fetchData,
					setNotification(
						NotificationMessages.contactDeletedSuccess(name),
					),
					displayAndRemoveNotification()
				)
				.catch(
					fetchData,
					setNotification(
						NotificationMessages.contactDeleteFail(name),
					),
					displayAndRemoveNotification()
				);
		}
	}

	

	const replaceOldNumberWithNew = () => {
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
				setNotification(
					NotificationMessages.contactNumberUpdated(contact[0].name),
				),
				removeNotifications,
			);
		}
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
