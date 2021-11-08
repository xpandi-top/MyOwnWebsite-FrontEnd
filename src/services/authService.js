import {baseUrl} from "../constants/UrlConstants";
import axios from "axios";

const authUrl = baseUrl + "/auth"

export const login = function(username, password, successCallback, failedCallback) {
    axios.post(authUrl + "/signin", {
        username: username,
        password: password
    }).then(response => {
        localStorage.setItem("jwt", response.data.token);
        successCallback(username);
    }).catch(error => {
        console.log(error);
        failedCallback(error.data.message);
    })
}