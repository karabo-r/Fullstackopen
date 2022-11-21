import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
	query AllAuthors {
		allAuthors {
			name
			born
			bookCount
		}
	}
`;

// const queries = {
// 	ALL_AUTHORS,
// };
// export default queries;
