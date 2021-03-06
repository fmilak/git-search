import { action, observable, runInAction } from "mobx";
import GitRepoResponse from "../model/GitRepoResponse";
import RestOptions from "../model/RestOptions";
import RestStore from "../service/RestStore";

class MainPageStore {
  restStore!: RestStore;

  repositories: Array<GitRepoResponse> = new Array<GitRepoResponse>();

  @observable shownData: Array<GitRepoResponse> = new Array<GitRepoResponse>();

  @observable isLoading = false;

  // Shown table columns
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Owner",
      dataIndex: ["owner", "login"],
      key: ["owner", "login"],
    },
  ];

  /**
   * Main function when entering page
   * Fetches first 100 GIT repositories
   */
  @action
  init = (): void => {
    this.isLoading = true;
    const url = `/repositories`;
    const restOptions: RestOptions = new RestOptions();
    restOptions.method = "get";
    this.restStore.fetch(url, restOptions, this.handleInitResponse);
  };

  /**
   * Handles REST response after repo fetching
   * @param apiResponse -> response from server
   */
  private handleInitResponse = (apiResponse: Array<GitRepoResponse>): void => {
    runInAction(() => {
      this.repositories = [...apiResponse];
      this.shownData = [...apiResponse];
      this.isLoading = false;
    });
  };

  /**
   * Fetches GIT repositories by user
   * @param value -> user by which to filter
   */
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

  /**
   * Handles REST response after repo by user fetching
   * @param apiResponse -> response from server
   */
  private handleUserRepos = (apiResponse: Array<GitRepoResponse>): void => {
    runInAction(() => {
      this.repositories = [...apiResponse];
      this.shownData = [...apiResponse];
      this.isLoading = false;
    });
  };

  /**
   * Function for filtering table data by repo name
   * @param value -> input by which to filter
   */
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
