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
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

};

module.exports = initDB;
