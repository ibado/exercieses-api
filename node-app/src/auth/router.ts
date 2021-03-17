import { Router } from 'express';
import { AuthController } from './controller';

export class AuthRouter {

    private router: Router;

    constructor(controller: AuthController) {
        this.router = Router();
        this.router.route('/register').post(
            async (req, res) => controller.register(req, res)
        );
        this.router.route('/authorize').post(
            async (req, res) => controller.authorize(req, res)
        );
    }

    getRouter() {
        return this.router;
    }
}
