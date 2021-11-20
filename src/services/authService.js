import {baseUrl} from "../constants/UrlConstants";
import axios from "axios";

const authUrl = baseUrl + "/auth"

export const login = (data) => axios.post(authUrl + "/signin", data);


export const logout = function() {
    localStorage.removeItem("user");
}

export const getUser = function() {
    return localStorage.getItem("user");
}

export const getAuthHeader = function() {
    const userJwt = localStorage.getItem('user');

    if (userJwt) {
        return { Authorization: 'Bearer ' + userJwt };
    } else {
        return {};
    }
}