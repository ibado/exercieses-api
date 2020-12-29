const express = require('express');
const Joi = require('joi');
const RoutineRepository = require('./data');

const app = express();
const router = express.Router();
const repository = new RoutineRepository();

app.use(express.json());

router.route('/routines')
    .get((req, res) => {
        console.log("getting routines...");
        repository.getAll()
            .then(value => res.send(value))
            .catch(error => res.status(500).send(`shit happened: ${error}`));
    })
    .post((req, res) => {

        const { error } = validateRoutine(req.body);

        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        const routine = { name: req.body.name, };

        repository.add(routine).then((value) => res.send(value));

    });

router.route('/routines/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        if (!id) {
            res.status(400).send(`${req.params.id} is an invalid id`);
            return;
        }
        repository.findById(id).then(value => {
            if (!value) {
                res.status(404).send("The routine with the given ID does not exist");
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
                res.status(404).send("The routine with the given ID does not exist");
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
                res.status(404).send("The routine with the given ID does not exist");
            }
        });
    });

app.get('/', (req, res) => {
    res.send('Hello from express sarasa');
});

app.use('/api', router);

function validateRoutine(routine) {
    return Joi.object({
        name: Joi.string().min(3).required()
    }).validate(routine);
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listen in port ${port}...`));

