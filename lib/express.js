import express from 'express';
import {init} from './mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import api from "../api/index";

init();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static('public'));

app.use('/api',api);

app.get("/", (req, res) => res.sendFile("../public/index.html"));
export default app;