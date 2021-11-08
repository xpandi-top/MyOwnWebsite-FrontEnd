import axios from "axios";
import {baseUrl} from "../constants/UrlConstants";

export const getALLRecords = (successCallback, failedCallback) => axios.get(`${baseUrl}/records`)
    .then((response) => successCallback(response.data))
    .catch((error) => failedCallback(error));

