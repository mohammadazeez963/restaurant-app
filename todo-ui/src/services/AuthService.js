import axios from "axios";

const AUTH_REST_API_BASE_URL = "http://localhost:8080/api/auth"

export const registerAPICall = (registerObj) => axios.post(AUTH_REST_API_BASE_URL + "/register", registerObj);

export const loginAPICall = (usernameOrEmail, password) => axios.post(AUTH_REST_API_BASE_URL + "/login", {usernameOrEmail, password});

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (username, role) => {
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", role);
}
export const isUserLoggedIn = () => sessionStorage.getItem("authenticatedUser") === null ? false : true ;

export const getLoggedInUser = () => sessionStorage.getItem("authenticatedUser");

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}

export const  isAdminUser = () => sessionStorage.getItem("role") === "ROLE_ADMIN" ? true : false;