import { Request, Response } from 'express';
import Joi from 'joi';

export function validateUser(req: Request, res: Response, next: Function) {
    const { error } = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }).validate(req.body);  

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    next();
}
