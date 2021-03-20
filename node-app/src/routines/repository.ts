import { DB } from '../data';

export class RoutineRepository {

    private dbConnection: DB;

    constructor(dbConnection: DB) {
        this.dbConnection = dbConnection;
    }

    async getAll() {
        const sql = 'SELECT * FROM routine;';
        return await this.dbConnection.query(sql);
    }

    async add(name: string) {
        const sql = 'INSERT INTO routine (label) VALUES (?);';
        return await this.dbConnection.query(sql, [name]);
    }
}
