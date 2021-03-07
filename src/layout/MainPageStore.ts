import { action, observable, runInAction } from "mobx";
import RestStore from "../service/RestStore";

class MainPageStore {
  restStore!: RestStore;

  repositories: Array<any> = new Array<any>();

  getRepos!: Function;

  @observable shownData: Array<any> = new Array<any>();

  @observable isLoading = false;

  // Shown table columns
  columns = [
    {
      title: "Name",
      dataIndex: ["node", "name"],
      key: ["node", "name"],
    },
    {
      title: "Description",
      dataIndex: ["node", "description"],
      key: ["node", "description"],
    },
    {
      title: "Language",
      dataIndex: ["node", "languages", "nodes", "name"],
      key: "language",
    },
    {
      title: "Owner",
      dataIndex: ["node", "owner", "login"],
      key: ["node", "owner", "login"],
    },
  ];

  /**
   * Fetches repositories by username
   * @param username -> username by which to get repositories
   */
  getReposByUsername = async (username: string): Promise<void> => {
    this.getRepos({
      variables: { username: username },
    });
  };

  /**
   * Fetches GIT repositories by user
   * @param value -> user by which to filter
   */
  @action
  filterUsers = (value: string): void => {
    if (value === "") {
      alert("Please enter valid username!");
      return;
    }
    this.getReposByUsername(value);
  };

  /**
   * Sets repositories for future use
   * @param repositories -> array of repositories
   */
  @action
  setRepositories = (repositories: any): void => {
    this.repositories = repositories;
    this.shownData = repositories;
  };

  /**
   * Function for filtering table data by repo name
   * @param value -> input by which to filter
   */
  @action
  filterTable = (value: string): void => {
    this.shownData = this.repositories.filter((repo: any) => {
      if (repo.node.name.includes(value)) {
        return repo;
      }
    });
  };
}

export default MainPageStore;
