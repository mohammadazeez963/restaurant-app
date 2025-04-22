import axios from "axios";

const USER_REST_API_BASE_URL = "http://localhost:3000/users"

export const fetchUsers = () => axios.get(USER_REST_API_BASE_URL);

export const addNewUser = (user) => axios.post(USER_REST_API_BASE_URL, user)

export const deleteUser = (id) => axios.delete(USER_REST_API_BASE_URL + '/'+id)

export const fetchSpecificRoles = (role) => axios.get(USER_REST_API_BASE_URL + "?role=" + role);

export const fetchSpecificUser = (username,password,role) => axios.get(USER_REST_API_BASE_URL + "?username=" + username + "&password=" + password + "&role=" + role.toUpperCase());

export const saveLoggedInUser = (username, role, id) => {
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("userId", id)
}
export const isUserLoggedIn = () => sessionStorage.getItem("authenticatedUser") === null ? false : true ;

export const getLoggedInUser = () => sessionStorage.getItem("authenticatedUser");

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}

export const  isAdminUser = () => sessionStorage.getItem("role") === "ROLE_ADMIN" ? true : false;