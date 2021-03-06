import { action, observable, runInAction } from "mobx";
import RestOptions from "../model/RestOptions";
import RestStore from "../service/RestStore";

class MainPageStore {
  restStore!: RestStore;

  repositories: Array<any> = new Array<any>();

  @observable shownData: Array<any> = new Array<any>();

  @observable isLoading = false;

  columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Owner",
      dataIndex: ["owner", "login"],
      key: ["owner", "login"],
    },
  ];

  @action
  init = (): void => {
    this.isLoading = true;
    const url = `/repositories`;
    const restOptions: RestOptions = new RestOptions();
    restOptions.method = "get";
    this.restStore.fetch(url, restOptions, this.handleInitResponse);
  };

  private handleInitResponse = (apiResponse: any): void => {
    runInAction(() => {
      this.repositories = [...apiResponse];
      this.shownData = [...apiResponse];
      this.isLoading = false;
    });
  };

  @action
  filterUsers = (value: string): void => {
    if (value === "") {
      this.init();
      return;
    }
    this.isLoading = true;
    const url = `/users/${value}/repos`;
    const restOptions: RestOptions = new RestOptions();
    restOptions.method = "get";
    this.restStore.fetch(url, restOptions, this.handleUserRepos);
  };

  private handleUserRepos = (apiResponse: any): void => {
    runInAction(() => {
      this.repositories = [...apiResponse];
      this.shownData = [...apiResponse];
      this.isLoading = false;
    });
  };

  @action
  filterTable = (value: string): void => {
    this.shownData = this.repositories.filter((repo: any) => {
      if (repo.name.includes(value)) {
        return repo;
      }
    });
  };
}

export default MainPageStore;
