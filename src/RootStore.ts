import MainPageStore from "./layout/MainPageStore";
import LoginStore from "./login/LoginStore";
import RestStore from "./service/RestStore";

/**
 * Main store for initializing React context
 */
class RootStore {
  loginStore: LoginStore;

  mainPageStore: MainPageStore;

  restStore: RestStore;

  constructor() {
    this.mainPageStore = new MainPageStore();
    this.loginStore = new LoginStore();
    this.restStore = new RestStore();
  }
}

export default RootStore;
