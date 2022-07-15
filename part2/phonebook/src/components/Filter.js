const Filter = (props) => {
	return (
		<h4>
			Filter <input value={props.filterWord} onChange={props.handleFilter} />
		</h4>
	);
};

export default Filter;
