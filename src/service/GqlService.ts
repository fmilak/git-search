import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { Base64 } from "js-base64";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer bd2af8010c09d6fad6e275de250ce23f43cc9e60`,
  },
});

export const gqlClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
