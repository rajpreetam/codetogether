import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

export const baseQuery = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});