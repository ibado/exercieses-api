const { Router } = require('express');

class ExerciseRouter extends Router {
    constructor(exercises) {
        super();
        console.log(`creating router - ${exercises}`);
        this.route('/')
            .get((req, res) => exercises.getAll(req, res))
            .post((req, res) => exercises.post(req, res));

        this.route('/:id')
            .get((req, res) => exercises.getById(req, res))
            .put((req, res) => exercises.put(req, res))
            .delete((req, res) => exercises.delete(req, res));
    }
}

module.exports = ExerciseRouter;
