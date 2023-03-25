import { Api } from "api-calls/GenerateApi";

const baseURL = "http://localhost:8000/";

const ApiCall = new Api({ baseURL }).api;

export default ApiCall;
