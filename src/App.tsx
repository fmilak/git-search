import { configure } from "mobx";
import React, { createContext, useEffect } from "react";
import "./App.css";
import MainPage from "./layout/MainPage";
import RootStore from "./RootStore";
import "antd/dist/antd.css";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { gqlClient } from "./service/GqlService";
import AppRouter from "./AppRouter";

/**
 * Enforces MobX action use
 */
configure({ enforceActions: "always" });

/**
 * Main app context for hooks
 */
const rootStore = new RootStore();
const loginStore = rootStore.loginStore;
export const RootContext = createContext(rootStore);

/**
 * Main app function
 */
const App: React.FC = () => {
  const [newGqlClient, setNewGqlClient] = React.useState<any>(null);

  useEffect(() => {
    const httpLink = createHttpLink({
      uri: "https://api.github.com/graphql",
      headers: {
        authorization: `Bearer ${loginStore.githubToken}`,
      },
    });
    const tempGqlClient = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });
    setNewGqlClient(tempGqlClient);
  }, [loginStore.githubToken]);

  if (!newGqlClient) {
    return (
      <ApolloProvider client={gqlClient}>
        <AppRouter />
      </ApolloProvider>
    );
  }

  return (
    <ApolloProvider client={newGqlClient}>
      <AppRouter />
    </ApolloProvider>
  );
};

export default App;
