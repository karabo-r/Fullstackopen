import { ALL_AUTHORS } from "../queries.js";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { UPDATE_AUTHOR_BIRTHYEAR } from "../mutations.js";
import Select from "react-select";

const Authors = (props) => {
	const [born, setBorn] = useState("");
	const [selectedOption, setSelectedOption] = useState(null);

	const authors = [];
	const allAuthors = useQuery(ALL_AUTHORS, { pollInterval: 2000 });
	const [editAuthor] = useMutation(UPDATE_AUTHOR_BIRTHYEAR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	});

	if (allAuthors.data) {
		allAuthors.data.allAuthors?.map((item) => {
			return authors.push(item);
		});
	}

	if (!props.show) {
		return null;
	}

	function handleUpdateAuthor(e) {
		e.preventDefault();
		const newAuthorBirthYear = { name: selectedOption.value, setBornTo: +born };
		editAuthor({ variables: newAuthorBirthYear });
	}

	// create options array of objects for react select
	const options = [];
	authors?.map((item) => {
		return options.push({ value: item.name, label: item.name });
	});

	return (
		<>
			<div>
				<h2>authors</h2>
				<table>
					<tbody>
						<tr>
							<th></th>
							<th>born</th>
							<th>books</th>
						</tr>
						{authors.map((a) => (
							<tr key={a.name}>
								<td>{a.name}</td>
								<td>{a.born}</td>
								<td>{a.bookCount}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div>
				<h2>Set birthday</h2>

				<form onSubmit={handleUpdateAuthor}>
					<Select
						defaultValue={selectedOption}
						onChange={setSelectedOption}
						options={options}
					/>
					<p>
						born{" "}
						<input
							type={"number"}
							value={born}
							onChange={(e) => setBorn(e.target.value)}
						/>
					</p>
					<button type={"submit"}>Update author</button>
				</form>
			</div>
		</>
	);
};

export default Authors;
