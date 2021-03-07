import { action, observable } from "mobx";
import GitRepoResponse from "../model/GitRepoResponse";
import RestStore from "../service/RestStore";

class MainPageStore {
  restStore!: RestStore;

  repositories: Array<GitRepoResponse> = new Array<GitRepoResponse>();

  getRepos!: Function;

  @observable shownData: Array<GitRepoResponse> = new Array<GitRepoResponse>();

  @observable isLoading = false;

  // Shown table columns
  columns = [
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
      title: "Languages",
      dataIndex: "languages",
      key: "languages",
    },
    {
      title: "Owner",
      dataIndex: ["owner", "login"],
      key: ["owner", "login"],
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
    this.repositories = repositories.map((repos: any) => {
      return { ...repos.node };
    });
    this.repositories.forEach((repo: any) => {
      if (repo.languages) {
        repo.languages = repo.languages.nodes
          .map((node: any) => {
            return node.name;
          })
          .join(", ");
      }
    });
    this.shownData = [...this.repositories];
  };

  /**
   * Function for filtering table data by repo name
   * @param value -> input by which to filter
   */
  @action
  filterTable = (value: string): void => {
    this.shownData = this.repositories.filter((repo: GitRepoResponse) => {
      if (repo.name.includes(value)) {
        return repo;
      }
    });
  };
}

export default MainPageStore;
