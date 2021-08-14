import { Base64 } from "js-base64";
import { isNil } from "lodash";
import { action, observable } from "mobx";
import RestOptions from "../model/RestOptions";
import RestStore from "../service/RestStore";

class LoginStore {
  restStore!: RestStore;

  history: any;

  @observable username = "";

  @observable password = "";

  @observable isAuthenticated = false;

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
    restInit.url = "http://localhost:8080/login";
    restInit.headers = {
      Authorization: `Basic ${Base64.encode(
        `${this.username}:${this.password}`
      )}`,
      "Content-Type": "application/json",
    };
    restInit.method = "POST";
    const response = await fetch(restInit.url, {
      headers: restInit.headers,
      method: restInit.method,
    });
    console.log(response);
    const responseJson = await response.json();
    console.log(responseJson);
    this.handleLoginResponse(responseJson);
  };

  @action
  handleLoginResponse = (responseJson: any): void => {
    console.log(responseJson);
    if (!isNil(responseJson.access_token)) {
      this.isAuthenticated = true;
      localStorage.setItem("token", responseJson.access_token);
      // this.getUser();
    }
  };
}

export default LoginStore;
