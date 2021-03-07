import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
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
