const mysql = require('mysql');
const util = require('util');

class RoutineRepository {

    constructor() {
        this.dbConnection = makeDb({
            host: "mysql",
            user: "test",
            password: "Sarasa1234%",
            database: "exercises"
        });
        const creationQuery = 'CREATE TABLE IF NOT EXISTS routines('
            + 'id INT PRIMARY KEY AUTO_INCREMENT,'
            + 'name VARCHAR(50));';
        this.dbConnection.query(creationQuery, (err, result) => {
            if (err) console.log(`error trying to create tables. E: ${err}`);
            else console.log("Tables created successfully.");
        });
    }

    async getAll() {
        return await this.dbConnection.query("SELECT * FROM routines;");
    }

    async findById(id) {
        const query = `SELECT * FROM routines WHERE id = ${id};`;
        const result = await this.dbConnection.query(query);
        return result.length > 0 ? result[0] : undefined;
    }

    async add(routine) {
        const query = `INSERT INTO routines (name) VALUES ("${routine.name}");`;
        const result = await this.dbConnection.query(query);
        return { id: result.insertId, name: routine.name};
    }

    async remove(id) {
        return await this.dbConnection.query(`DELETE FROM routines WHERE id=${id};`);
    }

    async update(routine) {
        const { id, name } = routine;
        const query = `UPDATE routines SET name=\"${name}\" WHERE id = ${id}`;
        return await this.dbConnection.query(query);
    }
}

function makeDb(config) {
    const connection = mysql.createConnection(config);  
    connection.connect((err) => {
        if (err) throw err;
        console.log("MySQL connected successfully");
    });

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
