import { configure } from "mobx";
import React, { createContext } from "react";
import "./App.css";
import MainPage from "./layout/MainPage";
import RootStore from "./RootStore";
import "antd/dist/antd.css";

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
  return <MainPage />;
};

export default App;
