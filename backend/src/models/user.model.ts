import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/database';
import bcrypt from 'bcryptjs';

interface UserRow extends RowDataPacket, IUser { }

export interface IUser {
    id?: number;
    name: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}
export type UserResponse = Omit<IUser, 'password'>;

export class UserModel {
    static async create(user: IUser): Promise<ResultSetHeader> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO users (name, lastName, email, username, password) VALUES (?, ?, ?, ?, ?)',
            [user.name, user.lastName, user.email, user.username, hashedPassword]
        );
        return result;
    }

    static async findByUsername(username: string): Promise<IUser | undefined> {
        const [rows] = await pool.execute<UserRow[]>(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
        return rows[0];
    }
    static async findById(id: number): Promise<IUser | undefined> {
        const [rows] = await pool.execute<UserRow[]>(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    static async updateUser(id: number, userData: Partial<IUser>) {
        const [result] = await pool.execute(
            'UPDATE users SET name = ?, lastName = ?, email = ?, username = ? WHERE id = ?',
            [userData.name, userData.lastName, userData.email, userData.username, id]
        );
        return result;
    }

    static async updatePassword(id: number, newPassword: string) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const [result] = await pool.execute(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, id]
        );
        return result;
    }
}