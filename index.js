const { ApolloServer, gql } = require('apollo-server');
const dotenv = require('dotenv');

dotenv.config();

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
];

const resolvers = {
  Query: {
    books: () => books
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`Server is listening on: ${url}`);
});
