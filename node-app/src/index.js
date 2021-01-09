const express = require('express');
const Joi = require('joi');
const RoutineRepository = require('./data');

const app = express();
const router = express.Router();
const repository = new RoutineRepository();

app.use(express.json());

router.route('/exercises')
    .get((req, res) => {
        console.log("getting exercises...");
        repository.getAll()
            .then(value => res.send(value))
            .catch(error => {
                res.status(500).send('500: shit happened');
                console.log(`error fetching exercises: ${error}`);
            });
    })
    .post((req, res) => {

        const { error } = validateRoutine(req.body);

        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        const exercise = { name: req.body.name, };

        repository.add(exercise).then((value) => res.send(value));

    });

router.route('/exercises/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        if (!id) {
            res.status(400).send(`${req.params.id} is an invalid id`);
            return;
        }
        repository.findById(id).then(value => {
            if (!value) {
                res.status(404).send("The exercises with the given ID does not exist");
                return;
            }
            res.send(value);
        });
    })
    .put((req, res) => {

        const id = Number(req.params.id);
        if (!id) {
            res.status(400).send(`${req.params.id} is an invalid id`);
            return;
        }

        repository.findById(id).then(value => {
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
            repository.update(value).then(v => res.send(value));
        });
    })
    .delete((req, res) => {
        const id = req.params.id;

        repository.remove(id).then((value) => {
            const result = value.affectedRows;
            if (result == 1) {
                res.send("Routine deleted");
            } else {
                res.status(404).send("The exercise with the given ID does not exist");
            }
        });
    });

app.get('/', (req, res) => {
    res.send('Hello from express sarasa');
});

app.use('/api', router);

function validateRoutine(exercise) {
    return Joi.object({
        name: Joi.string().min(3).required()
    }).validate(exercise);
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listen in port ${port}...`));

