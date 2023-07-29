import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_API;
const CE_BASE_URL = process.env.NEXT_PUBLIC_CE_JUDGE_BASE_API;

export const baseQuery = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});

export const ceJudgeBaseQuery = axios.create({
    baseURL: CE_BASE_URL,
    headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST
    }
});