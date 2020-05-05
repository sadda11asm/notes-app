import { Router } from 'express';
import UserController from '../controllers/UserController';
import isAuth from '../middlewares/isAuth'

const router = Router();

router.get('/:id', isAuth.checkToken,  UserController.getUser);
router.post('/signup', UserController.signUp);
router.post('/logout', isAuth.checkToken, UserController.logOut);
router.post('/login', UserController.logIn);


export default router;