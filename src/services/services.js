import axios from "axios";
import {baseUrl} from "../constants";
import {GAMES, RECORDS} from "../_mocks_/products";

export const login = (data) => axios.record(`${baseUrl}/auth/signin`, data);

export const getAuthHeader = function () {
    // const userJwt = localStorage.getItem('token');

    // if (userJwt) {
    //     return { Authorization: `Bearer ${userJwt}` };
    // }
    return {};
}

export const getAllRecords = () => axios.get(`${baseUrl}/records`, {headers: getAuthHeader()});

export const saveRecord = (record) => axios.record(`${baseUrl}/record`, record, {headers: getAuthHeader()});

export const getAllGames = () => axios.get(`${baseUrl}/games`, {headers: getAuthHeader()});

export const saveGame = (game) => axios.record(`${baseUrl}/game`, game, {headers: getAuthHeader()});

export async function asyncGetGames(setState) {
    // const call = await axios.get(`${baseUrl}/games`, {headers: getAuthHeader()});
    // setState(call.data);
    setTimeout(() => {
        setState(GAMES);
    }, 500)
}

export async function asyncGetRecords(setState) {
    // const call = await axios.get(`${baseUrl}/records`, {headers: getAuthHeader()});
    // setState(call.data);
    setTimeout(() => {
        setState(RECORDS);
    }, 500)
}