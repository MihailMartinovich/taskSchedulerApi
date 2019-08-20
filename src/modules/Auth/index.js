import Router from 'koa-router';
import authController from './controllers/authController';
import { AUTH_PREFIX } from '../../constants/prefixes';

const router = new Router({ prefix: AUTH_PREFIX });

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

export default router.routes();