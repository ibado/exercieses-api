import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync();

export async function hash(payload: string): Promise<string> {
    return await bcrypt.hash(payload, salt);
} 

export async function compare(payload: string, hashedPayload: string): Promise<boolean> {
    return await bcrypt.compare(payload, hashedPayload);
}
