import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
} from "@apollo/client";
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

export const GET_REPOS_BY_USERNAME = gql`
  query GetRepos($username: String!) {
    user(login: $username) {
      repositories(first: 100) {
        edges {
          node {
            id
            description
            name
            owner {
              login
            }
            languages(first: 10) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
