import { Router } from 'express';

import { RoutineController } from './controller';

export class RoutineRouter {

    private router: Router;

    constructor(controller: RoutineController) {
        this.router = Router();
        this.router.route('/')
            .get((req, res) => controller.getAll(req, res))
            .post((req, res) => controller.add(req, res));
    }

    getRouter(): Router {
        return this.router;
    }
}
