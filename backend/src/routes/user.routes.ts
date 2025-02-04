import { Router, Request, Response, RequestHandler } from 'express';
import { UserController } from '../controllers/user.controller';
import { auth } from '../middleware/auth.middleware';
import { AuthRequest } from '../middleware/auth.middleware';

const router = Router();

const loginHandler: RequestHandler = async (req, res) => {
    await UserController.login(req, res);
};

const changePasswordHandler: RequestHandler = async (req, res) => {
    await UserController.changePassword(req as AuthRequest, res);
};

router.post('/register', (req: Request, res: Response) => {
    return UserController.register(req, res);
});

router.post('/login', loginHandler);

router.put('/profile', auth, (req: Request, res: Response) => {
    return UserController.updateProfile(req as AuthRequest, res);
});

router.put('/change-password', auth, changePasswordHandler);

export default router;