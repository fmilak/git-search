import { Base64 } from "js-base64";

class RestOptions {
  method = "";

  headers: any;

  body: any;

  params: Map<string, any> = new Map<string, any>();

  accept = "application/vnd.github.v3+json";

  authorization = `Basic ${Base64.encode(
    `fmilak:ff2a3095f308a389d0d952f0ef398ee8bea78cd0`
  )}`;
}

export default RestOptions;
