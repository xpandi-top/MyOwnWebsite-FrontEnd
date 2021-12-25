import {baseUrl} from "../constants/UrlConstants";
import axios from "axios";

const authUrl = baseUrl + "/auth"

export const login = (data) => axios.post(authUrl + "/signin", data);

export const getAuthHeader = function() {
    const userJwt = localStorage.getItem('token');

    if (userJwt) {
        return { Authorization: 'Bearer ' + userJwt };
    } else {
        return {};
    }
}