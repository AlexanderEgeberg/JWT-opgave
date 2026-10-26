// setToken(token): Store the JWT token in local storage.
// getToken(): Retrieve the JWT token from local storage.
// loggedIn(): Check if a user is logged in by verifying if a token exists.
// logout(): Remove the JWT token from local storage.
// login(username, password):
// Send a POST request to the login endpoint with the provided username and password,
// and store the received token using setToken.

import { config } from "./config";

export const setToken = (token: string) => {
  return localStorage.setItem("token", token);
};
export const getToken = () => {
  return localStorage.getItem("token");
};

export const loggedIn = () => !!localStorage.getItem("token");

export const logout = () => {
  localStorage.removeItem("token");
};

export const login = async (username: string, password: string) => {
  const response = await fetch(config.API_URL + config.AUTH_LOGIN, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error(`GET fejlede: ${response.status}`);

  const result = (await response.json()) as {
    token: string;
    username: string;
  };
  console.log("res", result);

  setToken(result.token);
  localStorage.setItem("user", result.username);
  console.log("token", getToken());

  return result;
};

export async function fetchUser(userType: string) {
  const endpoint =
    userType === "admin" ? config.ADMINPROTECTED : config.USERPROTECTED;
  const response = await fetch(config.API_URL + endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      ...(loggedIn() ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
  });

  if (!response.ok) throw new Error(`GET fejlede: ${response.status}`);

  const result = (await response.json()) as {
    msg: string;
  };
  console.log("res", result);
  return result;
}
