const { Router } = require('express');

const { validateExercise, validateId } = require('./validations');

class ExerciseRouter extends Router {
    constructor(exercises) {
        super();
        this.route('/')
            .get((req, res) => exercises.getAll(req, res))
            .post(validateExercise, (req, res) => exercises.post(req, res));

        this.route('/:id')
            .get(validateId, (req, res) => exercises.getById(req, res))
            .put(validateId, validateExercise, (req, res) => exercises.put(req, res))
            .delete(validateId, (req, res) => exercises.delete(req, res));
    }
}

module.exports = ExerciseRouter;
