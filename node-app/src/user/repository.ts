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

    async findByEmail(email: string) {
        const sql = 'SELECT * FROM user WHERE email=?;';
        const result = await this.dbConnection.query(sql, [email]);
        return (Array.isArray(result) && result.length > 0) ? {
            id: result[0].id,
            email: result[0].email,
            password: result[0].password,
            isEnabled: result[0].enabled
        } : null
    }
}
