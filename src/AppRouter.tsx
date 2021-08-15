import Layout, { Content } from "antd/lib/layout/layout";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import App from "./App";
import MainPage from "./layout/MainPage";
import LoginView from "./login/LoginView";

const customHistory = createBrowserHistory();

//todo -> maybe implement login switch

const AppRouter = () => {
  return (
    <Router history={customHistory}>
      <div>
        <Layout
          className="layout"
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            height: "100%",
          }}
        >
          <Content style={{ padding: "0 50px" }}>
            <div>
              <Switch>
                <Route path="/login" component={LoginView} />
                <Route path="/" component={MainPage} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </div>
    </Router>
  );
};

export default AppRouter;
