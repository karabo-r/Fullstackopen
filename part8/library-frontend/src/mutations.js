import { gql } from "@apollo/client";

// add a new book
export const ADD_BOOK = gql`
	mutation Mutation(
		$title: String
		$author: String
		$published: Int
		$genres: [String]
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			author
		}
	}
`;

// update an author's year of birth
export const UPDATE_AUTHOR_BIRTHYEAR = gql`
	mutation EditAuthor($name: String!, $setBornTo: Int) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			born
			name
		}
	}
`;
