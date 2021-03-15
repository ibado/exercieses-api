require('dotenv').config();

const RoutesFactory = require('./routes');
const initDB = require('./data');

const express = require('express');
const logger = require('morgan');

const dbConnection = initDB();
const routesFactory = new RoutesFactory(dbConnection);

const app = express();
app.use(express.json());
app.use(logger('dev'));
app.use('/api/exercises', routesFactory.createExerciseRouter());
app.use('/api/auth', routesFactory.createAuthRouter());

const port = process.env.PORT;
app.listen(port, () => console.log(`Listen in port ${port}...`));

