import Router from 'koa-router';
import authController from './controllers/auth-controller';
import {AUTH_PREFIX} from "../../constants/prefixes";

const router = new Router({prefix: AUTH_PREFIX});

router.post('/signup', authController.signUp);

export default router.routes();