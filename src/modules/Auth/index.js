import Router from 'koa-router';
import authController from './controllers/auth-controller';
import {AUTH_PREFIX} from "../../constants/prefixes";
import checkUserMiddleware from "../../middlewares/user/check-user";

const router = new Router({prefix: AUTH_PREFIX});

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);


export default router.routes();