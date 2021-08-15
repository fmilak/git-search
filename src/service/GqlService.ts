import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
} from "@apollo/client";

/**
 * Creates HTTP link for GraphQL Apollo client
 */
const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_TOKEN}`, // todo -> insert token from backend
  },
});

/**
 * Initialization of Apollo client
 */
export const gqlClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

/**
 * Query -> gets GIT repositories by username
 */
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
