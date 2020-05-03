"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const ContactAPI_1 = __importDefault(require("./ContactAPI"));
const typeDefs = apollo_server_1.gql `
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
        contacts: (_source, {}, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("contacts was called!");
            return yield dataSources.contact.getContacts();
        }),
    },
    Mutation: {
        addContact: (_, newContact, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield dataSources.contact.addContact(newContact);
        }),
        deleteContact: (_, contactId, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield dataSources.contact.deleteContact(contactId);
        }),
        updateContact: (_, contact, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield dataSources.contact.updateContact(contact);
        }),
    },
};
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            contact: new ContactAPI_1.default(),
        };
    },
});
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
