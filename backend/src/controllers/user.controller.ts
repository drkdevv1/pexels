import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel, UserResponse } from '../models/user.model';
import { AuthRequest } from '../middleware/auth.middleware';


export class UserController {
    static async register(req: Request, res: Response) {
        try {
            const result = await UserModel.create(req.body);
            const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET!);
            res.status(201).json({
                user: { ...req.body, id: result.insertId, password: undefined },
                token
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(400).json({ error: 'Registration failed' });
        }
    }
    static async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const user = await UserModel.findByUsername(username);

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
            const userResponse: UserResponse = {
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                username: user.username
            };

            res.json({ user: userResponse, token });
        } catch (error) {
            res.status(400).json({ error: 'Login failed' });
        }
    }
    static async updateProfile(req: AuthRequest, res: Response) {
        try {
            const userId = req.userId!;
            await UserModel.updateUser(userId, req.body);
            res.json({ message: 'Profile updated successfully' });
        } catch (error) {
            res.status(400).json({ error: 'Update failed' });
        }
    }

    static async changePassword(req: AuthRequest, res: Response) {
        try {
            const userId = req.userId!;
            const { currentPassword, newPassword } = req.body;

            const user = await UserModel.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            if (!(await bcrypt.compare(currentPassword, user.password))) {
                return res.status(401).json({ error: 'Current password is incorrect' });
            }

            await UserModel.updatePassword(userId, newPassword);
            res.json({ message: 'Password updated successfully' });
        } catch (error) {
            console.error('Password change error:', error);
            res.status(400).json({ error: 'Password change failed' });
        }
    }
}