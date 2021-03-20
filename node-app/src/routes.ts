import { DB } from './data';
import { AuthRouter } from './auth/router';
import { UserRepository } from './user/repository';
import { AuthController } from './auth/controller';
import ExerciseRouter = require('./exercises/router');
import ExerciseRepository = require('./exercises/repository');
import ExerciseController = require('./exercises/controller');
import { RoutineRouter } from './routines/router';
import { RoutineRepository } from './routines/repository';
import { RoutineController } from './routines/controller';

import { Router } from 'express';

export class RoutesFactory {

    private dbConnection: DB;

    constructor(dbConnection: DB) {
        this.dbConnection = dbConnection;
    }

    createAuthRouter(): Router {
        const userRepository = new UserRepository(this.dbConnection);
        const authController = new AuthController(userRepository);
        return new AuthRouter(authController).getRouter();
    }

    createExerciseRouter() {
        const repository = new ExerciseRepository(this.dbConnection);
        const controller = new ExerciseController(repository);
        return new ExerciseRouter(controller);
    }

    createRoutinesRouter(): Router {
        const repository = new RoutineRepository(this.dbConnection);
        const controller = new RoutineController(repository);
        return new RoutineRouter(controller).getRouter();
    }
}

module.exports = RoutesFactory;
