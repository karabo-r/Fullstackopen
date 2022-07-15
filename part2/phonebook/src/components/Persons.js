const Persons = (props) => {
	return (
		<>
			{props.displayContacts?.map((data) => {
				return (
					<li key={data.id}>
						{data.name} {data.number}
					</li>
				);
			})}
		</>
	);
};

export default Persons;
