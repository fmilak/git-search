import { action, observable } from "mobx";
import RestOptions from "../model/RestOptions";
import RestStore from "../service/RestStore";

class LoginStore {
  restStore!: RestStore;

  history: any;

  githubToken = "";

  @observable username = "";

  @observable password = "";

  @observable isLoggedIn = false;

  @action
  onUsernameChange = (e: any): void => {
    this.username = e.target.value;
  };

  @action
  onPasswordChange = (e: any): void => {
    this.password = e.target.value;
  };

  @action
  tryLogin = async (): Promise<void> => {
    const restInit: RestOptions = new RestOptions();
    restInit.url = "/token";
    restInit.headers = {
      "Content-Type": "application/json",
    };
    restInit.method = "POST";
    restInit.body = JSON.stringify({
      uuid: "",
      username: this.username,
      password: this.password,
    });
    this.restStore.fetch(restInit.url, restInit, this.handleLoginResponse);
  };

  @action
  handleLoginResponse = (responseJson: any): void => {
    this.isLoggedIn = true;
    this.githubToken = responseJson.token;
  };
}

export default LoginStore;
