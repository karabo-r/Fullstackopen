const PersonForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<h4>
				name: <input value={props.newName} onChange={props.handleNameChange} />
			</h4>
			<h4>
				number:{" "}
				<input value={props.newNumber} onChange={props.handleNumberChange} />
			</h4>
			<button type="submit">Add</button>
		</form>
	);
};

export default PersonForm;
