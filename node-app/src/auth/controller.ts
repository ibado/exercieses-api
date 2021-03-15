import { UserRepository } from '../user/repository'
import { Request, Response } from 'express';

export class AuthController {

    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    post(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = {email, password, isEnabled: true};
        this.repository.add(user).then(_ => {
            res.sendStatus(201);
        }).catch(e => {
            console.error(e);
            res.sendStatus(500);
        });
    }

}

module.exports = AuthController;
