import axios from 'axios';

export const HOST = process.env.BASE_URL;
const VERSION = '/pw';
const API = HOST + VERSION;

const instance = axios.create({
  baseURL: HOST,
});

export default instance;
