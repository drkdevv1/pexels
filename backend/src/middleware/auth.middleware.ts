import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    userId?: number;
}

export type AuthRequestHandler = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => Promise<void> | void;

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error();

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Please authenticate.' });
    }
};