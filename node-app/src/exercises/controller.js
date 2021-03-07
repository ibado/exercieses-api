class ExerciseController {

    constructor(repository) {
        this.repository = repository;
    }

    getAll(_, res) {
        this.repository.getAll()
            .then(value => res.send(value))
            .catch(error => {
                res.status(500).send('500: shit happened');
                console.log(`error fetching exercises: ${error}`);
            });
    }

    post(req, res) { 

        const exercise = { name: req.body.name, };

        this.repository.add(exercise).then((value) => res.send(value));
    }

    getById(req, res) {
        
        this.repository.findById(req.params.id).then(value => {
            if (!value) this.#notFound(res);
            res.send(value);
        });
    }

    put(req, res) {

        this.repository.findById(req.params.id).then(value => {
            if (!value) this.#notFound(res);
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
                this.#notFound(res);
            }
        });
    }

    #notFound(res) {
        res.status(404).send("The exercises with the given ID does not exist");
    }
}

module.exports = ExerciseController;

