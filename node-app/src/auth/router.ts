import { Router } from 'express';
import { AuthController } from './controller';
import { validateUser } from './validation';

export class AuthRouter {

    private router: Router;

    constructor(controller: AuthController) {
        this.router = Router();
        this.router.route('/register').post(
            validateUser,
            (req, res) => controller.register(req, res)
        );
        this.router.route('/authorize').post(
            validateUser,
            (req, res) => controller.authorize(req, res)
        );
    }

    getRouter() {
        return this.router;
    }
}
