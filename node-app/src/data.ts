const mysql = require('mysql');
const util = require('util');

function connectDB(config: object): DB {
    const connection = mysql.createConnection(config);  

    return {
        query(sql: string, args: any[]) {
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

export interface DB {
    query: (query: string, args: any[]) => Promise<any>
    close: () => void
}

module.exports = initDB;
