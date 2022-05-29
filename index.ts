import bodyParser from 'body-parser';
import { config } from 'dotenv';
import express from 'express';
import path from 'path';
import corsOptions from './src/config/env/cors';
import { handleError } from './src/base/handle-error';
import injector from './src/base/injector';
import cronjob from "./src/services/cronjob"
import { connectMysql } from './src/base/connection/mysql';

const cors = require('cors');

const rootRoute = require('./src/routes/index');

const app = express();

config();
connectMysql()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(injector);
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', rootRoute);


app.use(handleError);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`* ### Start with port: ${process.env.PORT || 8080} *`);
});

cronjob();