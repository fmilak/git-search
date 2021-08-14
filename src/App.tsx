import { configure } from "mobx";
import React, { createContext } from "react";
import "./App.css";
import MainPage from "./layout/MainPage";
import RootStore from "./RootStore";
import "antd/dist/antd.css";
import { ApolloProvider } from "@apollo/client";
import { gqlClient } from "./service/GqlService";

/**
 * Enforces MobX action use
 */
configure({ enforceActions: "always" });

/**
 * Main app context for hooks
 */
const rootStore = new RootStore();
export const RootContext = createContext(rootStore);

/**
 * Main app function
 */
const App: React.FC = () => {
  return (
    <ApolloProvider client={gqlClient}>
      <MainPage />
    </ApolloProvider>
  );
};

export default App;
