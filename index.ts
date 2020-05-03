import { ApolloServer, gql, ResolverFn } from "apollo-server";
import ContactAPI from "./ContactAPI";

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Contact {
    lastName: String!
    firstName: String!
    email: String!
  }

  type Query {
    books: [Book]
    contacts: [Contact]
  }

  type Mutation {
    addContact(firstName: String!, lastName: String!, email: String!): Contact
    deleteContact(contactId: String!): String!
    updateContact(
      firstName: String!
      lastName: String!
      email: String!
      id: String!
    ): String!
  }
`;

const booksArr = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

const resolvers = {
  Query: {
    books: () => booksArr,
    contacts: async (
      _source: any,
      {},
      { dataSources }: { dataSources: any }
    ) => {
      console.log("contacts was called!");
      return await dataSources.contact.getContacts();
    },
  },
  Mutation: {
    addContact: async (
      _,
      newContact: { firstName: string; lastName: string; email: string },
      { dataSources }: { dataSources: any }
    ) => {
      return await dataSources.contact.addContact(newContact);
    },
    deleteContact: async (
      _,
      contactId: string,
      { dataSources }: { dataSources: any }
    ) => {
      return await dataSources.contact.deleteContact(contactId);
    },
    updateContact: async (
      _,
      contact: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
      },
      { dataSources }: { dataSources: any }
    ) => {
      return await dataSources.contact.updateContact(contact);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      contact: new ContactAPI(),
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
