const mysql = require('mysql');
const util = require('util');

function connectDB(config) {
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

const initDB = () => {
    return connectDB({
        host: "mysql",
        user: "test",
        password: "Sarasa1234%",
        database: "exercises"
    });

};

module.exports = initDB;
