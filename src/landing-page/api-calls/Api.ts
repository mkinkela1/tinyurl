import { Api as UserServiceApi } from "api-calls/UserServiceApi";
import { Api as UrlServiceApi } from "api-calls/UrlServiceApi";

const baseURL = "http://localhost:3333/";

const Api = {
  ...new UserServiceApi({ baseURL }).api,
  ...new UrlServiceApi({ baseURL }).api
};

export default Api;
