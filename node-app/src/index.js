const express = require('express');
const exercises = require('./exercises');

const app = express();
const router = express.Router();

app.use(express.json());

router.route('/exercises')
    .get(exercises.getAll)
    .post(exercises.post);

router.route('/exercises/:id')
    .get(exercises.getById)
    .put(exercises.put)
    .delete(exercises.delete);

app.get('/', (_, res) => {
    res.send('Hello from express sarasa');
});

app.use('/api', router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listen in port ${port}...`));

