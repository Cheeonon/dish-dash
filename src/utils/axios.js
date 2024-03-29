import axios from 'axios';

// const PORT = 8080;
const baseURL = `https://dish-dash-api-production.up.railway.app`;

export const postSignUp = (body) => {
    return axios.post(`${baseURL}/users/sign-up`, body);
};

export const postLogin = (body) => {
    return axios.post(`${baseURL}/users/login`, body);
};

export const getUserProfile = (token) => {
    return axios.get(`${baseURL}/profiles/profile`, { 
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const postScores = (body) => {
    return axios.post(`${baseURL}/profiles/scores`, body);
};

export const getTopScores = () => {
    return axios.get(`${baseURL}/profiles/topScores`);
};

export const updateHearts = (body) => {
    return axios.post(`${baseURL}/update/heart`, body);
};

export const buyDoubleScore = (body) => {
    return axios.post(`${baseURL}/update/doubleScore`, body);
};