import { gql } from "@apollo/client";

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
