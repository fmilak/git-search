import { Base64 } from "js-base64";

/**
 * Additional options for REST requests
 */
class RestOptions {
  method = "";

  headers: any;

  body: any;

  params: Map<string, any> = new Map<string, any>();

  accept = "application/vnd.github.v3+json";

  authorization = `Basic ${Base64.encode(`fmilak:`)}`;
}

export default RestOptions;
