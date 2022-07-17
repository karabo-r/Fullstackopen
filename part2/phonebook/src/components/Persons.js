const Persons = (props) => {
	return (
		<>
			{props.displayContacts?.map((data) => {
				return (
					<li key={data.id}>
						{data.name} {data.number}
						<button onClick={()=>props.handleDelete(data.id)}>Delete</button>
					</li>
				);
			})}
		</>
	);
};

export default Persons;
