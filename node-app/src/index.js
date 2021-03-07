require('dotenv').config();

const ExerciseRouter = require('./exercises/router');
const ExerciseRepository = require('./exercises/repository');
const ExerciseController = require('./exercises/controller');
const initDB = require('./data');

const express = require('express');
const logger = require('morgan');


const dbConnection = initDB();

const repository = new ExerciseRepository(dbConnection);
const controller = new ExerciseController(repository);
const exercises = new ExerciseRouter(controller);

const app = express();
app.use(express.json());
app.use(logger('dev'));
app.use('/api/exercises', exercises);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listen in port ${port}...`));

