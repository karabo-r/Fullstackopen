import { ALL_AUTHORS } from "../queries.js";
import { useQuery } from "@apollo/client";

const Authors = (props) => {
	const authors = [];
	const results = useQuery(ALL_AUTHORS, {
		pollInterval: 2000
	  });

	if (results.data) {
		results.data.allAuthors?.map((item) => {
			return authors.push(item);
		});
	}
  
	if (!props.show) {
		return null;
	}

	return (
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
	);
};

export default Authors;
