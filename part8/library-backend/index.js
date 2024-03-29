const { ApolloServer, gql } = require("apollo-server");
const { uid } = require("uid");
const mongoose = require("mongoose")
const Book = require("./models/Book");
const Author = require("./models/Author");

mongoose.set("strictQuery", false)
mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4")
.then(()=>console.log("database connected"))
.catch((error)=>console.log(error))

let authors = [
	{
		name: "Robert Martin",
		id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
		born: 1952,
	},
	{
		name: "Martin Fowler",
		id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
		born: 1963,
	},
	{
		name: "Fyodor Dostoevsky",
		id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
		born: 1821,
	},
	{
		name: "Joshua Kerievsky", // birthyear not known
		id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
	},
	{
		name: "Sandi Metz", // birthyear not known
		id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
	},
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
 */

let books = [
	{
		title: "Clean Code",
		published: 2008,
		author: "Robert Martin",
		id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring"],
	},
	{
		title: "Agile software development",
		published: 2002,
		author: "Robert Martin",
		id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
		genres: ["agile", "patterns", "design"],
	},
	{
		title: "Refactoring, edition 2",
		published: 2018,
		author: "Martin Fowler",
		id: "afa5de00-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring"],
	},
	{
		title: "Refactoring to patterns",
		published: 2008,
		author: "Joshua Kerievsky",
		id: "afa5de01-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring", "patterns"],
	},
	{
		title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
		published: 2012,
		author: "Sandi Metz",
		id: "afa5de02-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring", "design"],
	},
	{
		title: "Crime and punishment",
		published: 1866,
		author: "Fyodor Dostoevsky",
		id: "afa5de03-344d-11e9-a414-719c6709cf3e",
		genres: ["classic", "crime"],
	},
	{
		title: "The Demon ",
		published: 1872,
		author: "Fyodor Dostoevsky",
		id: "afa5de04-344d-11e9-a414-719c6709cf3e",
		genres: ["classic", "revolution"],
	},
];

const typeDefs = gql`
	type Query {
		allBooks(author: ID, genre: ID): [Book!]!
		allAuthors: [Author!]!
		bookCount: Int!
		authorCount: Int!
	}

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book!
		editAuthor(name: String!, setBornTo: Int!): Author
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}

	type Author {
		name: String!
		born: Int
		bookCount: Int
	}
`;

const resolvers = {
	Query: {
		allBooks: (parent, args, context) => {
			const { author, genre } = args;
			if (author) {
				return books.filter((item) => item.author === author);
			}
			if (genre) {
				let items = [];
				books.map((item) => {
					if (item.genres.includes(genre)) {
						items.push(item);
					}
				});
				return items;
			}
			return books;
		},
		allAuthors: () => authors,
		bookCount: () => books.length,
		authorCount: () => authors.length,
	},

	Author: {
		name: (parent, agrs, context) => parent.name,
		bookCount: (parent, args, context) => {
			let numberOfBooks = 0;
			const author = parent.name;
			books.find((item) => {
				if (item.author === author) {
					numberOfBooks++;
				}
			});
			return numberOfBooks;
		},
	},
	Mutation: {
		addBook: (parent, args, context) => {
			const doesAuthorExist = books.find((item) => item.author === args.author);

			// add new author
			if (!doesAuthorExist) {
				const newAuthor = {
					id: uid(),
					name: args.author,
					born: null,
				};
				authors = authors.concat(newAuthor);
			}
			const newBook = { id: uid(), ...args };

			// books = books.concat(newBook);
			books.push(newBook);
			return newBook;
		},
		// Joshua Kerievsky
		editAuthor: (parent, agrs, context) => {
			const { name, setBornTo } = agrs;
			const doesAuthorExist = authors.find((item) => item.name === name);

			if (!doesAuthorExist) return null;

			// update the author
			authors.map((item) => {
				if (item.name === name) {
					item.born = setBornTo;
				}
			});

			const newAuthor = doesAuthorExist;
			return newAuthor;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
