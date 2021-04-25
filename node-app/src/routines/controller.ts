import { Request, Response } from 'express';

import { RoutineRepository } from './repository';

export class RoutineController {

    private repository: RoutineRepository;

    constructor(repository: RoutineRepository) {
        this.repository = repository;
    }

    async getAll(_: Request, res: Response) {
        try {
            const result = await this.repository.getAll();
            res.send(result);
        } catch(e) {
            console.error(e);
            res.sendStatus(500);
        }           
    }

    async add(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const result = await this.repository.add(name);
            res.send(result);
        } catch(e) {
            console.error(e);
            res.sendStatus(500);
        }
    }
}
