import jwt from 'jsonwebtoken';
import fs from 'fs';

const key = fs.readFileSync('.secrets/private.key')

export function create(payload: object): string {
    return jwt.sign(payload, key, { expiresIn: "1h", algorithm: "RS256" });
}
