import MainPageStore from "./layout/MainPageStore";
import RestStore from "./service/RestStore";

class RootStore {
  mainPageStore: MainPageStore;

  restStore: RestStore;

  constructor() {
    this.mainPageStore = new MainPageStore();
    this.restStore = new RestStore();
  }
}

export default RootStore;
