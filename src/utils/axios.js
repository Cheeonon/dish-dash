import axios from 'axios';

const PORT = 8080;
const baseURL = `http://localhost:${PORT}`;

export const postSignUp = (body) => {
    return axios.post(`${baseURL}/sign-up`, body);
};

export const postLogin = (body) => {
    return axios.post(`${baseURL}/login`, body);
};