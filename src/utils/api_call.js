import { atomicConfig } from "../config";

import { call_api_auth } from "./services";

export async function get_store_management_api(path) {
  let url = `${atomicConfig.storeManagementServiceUrl}${path}`;
  let result = await call_api_auth(url, "GET");
  // return a promise
  return result;
}

export async function post_store_management_api(path, payload) {
  let url = `${atomicConfig.storeManagementServiceUrl}${path}`;
  let result = await call_api_auth(url, "POST", payload);
  // return a promise
  return result;
}
