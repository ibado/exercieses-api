const mysql = require('mysql');
const util = require('util');

class RoutineRepository {

    constructor() {
        this.dbConnection = initDB({
            host: "mysql",
            user: "test",
            password: "Sarasa1234%",
            database: "exercises"
        });
    }

    async getAll() {
        return await this.dbConnection.query("SELECT * FROM routines;");
    }

    async findById(id) {
        const query = 'SELECT * FROM routines WHERE id = ?;';
        const result = await this.dbConnection.query(query, [id]);
        return result.length > 0 ? result[0] : undefined;
    }

    async add(routine) {
        const query = 'INSERT INTO routines (name) VALUES (?);';
        const result = await this.dbConnection.query(query, [routine.name]);
        return { id: result.insertId, name: routine.name};
    }

    async remove(id) {
        return await this.dbConnection.query('DELETE FROM routines WHERE id = ?;', [id]);
    }

    async update(routine) {
        const { id, name } = routine;
        const query = 'UPDATE routines SET name = ? WHERE id = ?';
        return await this.dbConnection.query(query, [name, id]);
    }
}

function initDB(config) {
    const connection = mysql.createConnection(config);  

    return {
        query(sql, args) {
          return util.promisify(connection.query)
            .call(connection, sql, args);
        },
        close() {
          return util.promisify(connection.end).call(connection);
        }
    };
}

module.exports = RoutineRepository;
