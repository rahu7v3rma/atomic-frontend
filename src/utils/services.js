import axios from "axios";
import jwtDecode from "jwt-decode";

const handleTokenExpired = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const { exp } = jwtDecode(accessToken);
  let expiredTimer;
  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  return timeLeft >= 0;
};

export async function call_api(
  url,
  method = "POST",
  payload = {},
  headers = {}
) {
  return await axios.request({
    url,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    data: payload,
    crossDomain: true,
    method,
  });
}

export async function call_api_auth(
  url,
  method = "POST",
  payload = {},
  headers = {}
) {
  const accessToken = window.localStorage.getItem("accessToken");
  const token_is_valid = handleTokenExpired(accessToken);
  if (token_is_valid) {
    return await axios.request({
      url,
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
        ...headers,
      },
      data: payload,
      crossDomain: true,
      method,
    });
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
    window.location.href = "/auth/sign-in";
  }
}
