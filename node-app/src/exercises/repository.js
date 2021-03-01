class ExerciseRepository {

    constructor(dbConnection) {
        console.log(`creating repository - ${dbConnection}`);
        this.dbConnection = dbConnection;
    }

    async getAll() {
        return await this.dbConnection.query("SELECT * FROM exercises;");
    }

    async findById(id) {
        const query = 'SELECT * FROM exercises WHERE id = ?;';
        const result = await this.dbConnection.query(query, [id]);
        return result.length > 0 ? result[0] : undefined;
    }

    async add(routine) {
        const query = 'INSERT INTO exercises (name) VALUES (?);';
        const result = await this.dbConnection.query(query, [routine.name]);
        return { id: result.insertId, name: routine.name};
    }

    async remove(id) {
        return await this.dbConnection.query('DELETE FROM exercises WHERE id = ?;', [id]);
    }

    async update(routine) {
        const { id, name } = routine;
        const query = 'UPDATE exercises SET name = ? WHERE id = ?';
        return await this.dbConnection.query(query, [name, id]);
    }
}

module.exports = ExerciseRepository;
