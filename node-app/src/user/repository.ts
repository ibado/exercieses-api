import { User } from './user';
import { DB } from './../data';

export class UserRepository {

    private dbConnection: DB;

    constructor(dbConnection: DB) {
        this.dbConnection = dbConnection;
    }

    async add(user: User) {
        const sql = 'INSERT INTO user (email, password, enabled) VALUES (?, ?, ?);';
        const args = [user.email, user.password, user.isEnabled];
        const { insertId } = await this.dbConnection.query(sql, args);
        return insertId;  
    }
}

module.exports = UserRepository;
