import {baseUrl} from "../constants/UrlConstants";
import axios from "axios";


export const login = (data) => axios.post(baseUrl + "/auth/signin", data);

export const getAuthHeader = function() {
    const userJwt = localStorage.getItem('token');

    if (userJwt) {
        return { Authorization: 'Bearer ' + userJwt };
    } else {
        return {};
    }
}

export const getALLRecords = () =>  axios.get(`${baseUrl}/records`, {headers: getAuthHeader()});

export const saveRecord = (record) =>  axios.post(`${baseUrl}/record`, record,{headers: getAuthHeader()});

export const getALLGames = () =>  axios.get(`${baseUrl}/games`);

export const getGameNames = () =>  axios.get(`${baseUrl}/gamenames`);
export const getGame = (game) =>  axios.get(`${baseUrl}/game/${game}`);

export const saveGame = (game) =>  axios.post(`${baseUrl}/game`, game,{headers: getAuthHeader()});

export const getPlayers = () =>  axios.get(`${baseUrl}/players`);