import axios from "axios";
import {baseUrl} from "../constants/UrlConstants";
import {getAuthHeader} from "./authService";

export const getALLRecords = () =>  axios.get(`${baseUrl}/records`, {headers: getAuthHeader()})


