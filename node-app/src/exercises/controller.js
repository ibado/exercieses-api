const Joi = require('joi');

class ExerciseController {

    constructor(repository) {
        console.log(`creating controller - ${repository}`);
        this.repository = repository;
    }

    getAll(_, res) {
        console.log("getting exercises...");

        this.repository.getAll()
            .then(value => res.send(value))
            .catch(error => {
                res.status(500).send('500: shit happened');
                console.log(`error fetching exercises: ${error}`);
            });
    }

    post(req, res) {
        const { error } = validateRoutine(req.body);

        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        const exercise = { name: req.body.name, };

        this.repository.add(exercise).then((value) => res.send(value));
    }

    getById(req, res) {
        const id = Number(req.params.id);
        if (!id) {
            res.status(400).send(`${req.params.id} is an invalid id`);
            return;
        }
        this.repository.findById(id).then(value => {
            if (!value) {
                res.status(404).send("The exercises with the given ID does not exist");
                return;
            }
            res.send(value);
        });
    }

    put(req, res) {
        const id = Number(req.params.id);
        if (!id) {
            res.status(400).send(`${req.params.id} is an invalid id`);
            return;
        }

        this.repository.findById(id).then(value => {
            if (!value) {
                res.status(404).send("The exercise with the given ID does not exist");
                return;
            }

            const { error } = validateRoutine(req.body);

            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }

            value.name = req.body.name;
            this.repository.update(value).then(_ => res.send(value));
        });
    }

    delete(req, res) {
        const id = req.params.id;

        this.repository.remove(id).then((value) => {
            const result = value.affectedRows;
            if (result == 1) {
                res.send("Routine deleted");
            } else {
                res.status(404).send("The exercise with the given ID does not exist");
            }
        });
    }
}

function validateRoutine(exercise) {
    return Joi.object({
        name: Joi.string().min(3).required()
    }).validate(exercise);
}

module.exports = ExerciseController;

