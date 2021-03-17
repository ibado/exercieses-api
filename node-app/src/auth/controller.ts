import { UserRepository } from '../user/repository'
import { Request, Response } from 'express';
import { hash, compare } from '../util/bcrypt';
import { create } from '../util/jwt';

export class AuthController {

    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async register(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const isEmailTaken = await this.repository.findByEmail(email);
            if (isEmailTaken) {
                res.status(500).json({
                    message: `The email ${email} is already taken`
                })
                return;
            }
            const hashedPassword = await hash(password);
            const user = { email, password: hashedPassword, isEnabled: true };
            const id = await this.repository.add(user);
            if (id > 0) res.sendStatus(201)
            else res.status(500).json({
                message: "Error trying to create user"
            });
        } catch(e) {
            console.error(e);
            res.sendStatus(500);
        }
    }

    async authorize(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.repository.findByEmail(email);
            if (!user) {
                res.status(404).json({
                    message: "User not found"
                })
                return;
            }
            const isPasswordValid = await compare(password, user.password)
            if (!isPasswordValid) {
                res.status(401).json({
                    message: "Invalid password"
                })
                return;
            }
            const token = create({id: user.id, email: user.email});
            res.status(201).json({
                message: "User authorized successfully",
                token: token
            })

        } catch(e) {
            console.error(e);
            res.sendStatus(500);
        }
    }
}
