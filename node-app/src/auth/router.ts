import { Router } from 'express';
import { AuthController } from './controller';

export class AuthRouter {

    private router: Router;

    constructor(controller: AuthController) {
        this.router = Router();
        this.router.route('/').post((req, res) => controller.post(req, res));
    }

    getRouter() {
        return this.router;
    }
}
