class ExerciseController {

    constructor(repository) {
        this.repository = repository;
    }

    getAll(_, res) {
        this.repository.getAll()
            .then(value => res.send(value))
            .catch(e => this._handleError(e, res));
    }

    post(req, res) { 

        const exercise = { name: req.body.name, };

        this.repository.add(exercise)
            .then((value) => res.send(value))
            .catch(e => this._handleError(e, res));
    }

    getById(req, res) {
        
        this.repository.findById(req.params.id).then(value => {
            if (!value) this._notFound(res);
            res.send(value);
        }).catch(e => this._handleError(e, res));
    }

    put(req, res) {

        this.repository.findById(req.params.id).then(value => {
            if (!value) this.notFound(res);
            value.name = req.body.name;
            this.repository.update(value)
                .then(_ => res.send(value))
                .catch(e => this._handleError(e, res));
        }).catch(e => this._handleError(e, res));
    }

    delete(req, res) {
        const id = req.params.id;

        this.repository.remove(id).then((value) => {
            const result = value.affectedRows;
            if (result == 1) {
                res.send("Routine deleted");
            } else {
                this._notFound(res);
            }
        }).catch(e => this._handleError(e, res));
    }

    _notFound(res) {
        res.status(404).send("The exercises with the given ID does not exist");
    }

    _handleError(e, res) {
        console.error(e);
        res.sendStatus(500);
    }
}

module.exports = ExerciseController;

