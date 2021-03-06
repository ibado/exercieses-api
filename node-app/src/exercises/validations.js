const Joi = require('joi');

const validateExercise = (req, res, next) => {
    const { error } = Joi.object({
        name: Joi.string().min(3).required()
    }).validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
    }

    next();
}

const validateId = (req, res, next) => {
    const id = Number(req.params.id);
    if (!id) {
        res.status(400).send(`${req.params.id} is an invalid id`);
    }

    next();
}

module.exports = { validateExercise, validateId };
