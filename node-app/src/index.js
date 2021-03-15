require('dotenv').config();

const ExerciseRouter = require('./exercises/router');
const ExerciseRepository = require('./exercises/repository');
const ExerciseController = require('./exercises/controller');
const initDB = require('./data');

const AuthRouter = require('./auth/router');
const UserRepository = require('./user/repository');
const AuthController = require('./auth/controller');

const express = require('express');
const logger = require('morgan');


const dbConnection = initDB();

const repository = new ExerciseRepository(dbConnection);
const controller = new ExerciseController(repository);
const exercises = new ExerciseRouter(controller);

const userRepository = new UserRepository(dbConnection);
const authController = new AuthController(userRepository);
const auth = new AuthRouter(authController);

const app = express();
app.use(express.json());
app.use(logger('dev'));
app.use('/api/exercises', exercises);
app.use('/api/auth', auth.getRouter());

const port = process.env.PORT;
app.listen(port, () => console.log(`Listen in port ${port}...`));

