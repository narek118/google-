import {init} from "./moduls/index";
import express from 'express';

const api = express();

init(api);

export default api;