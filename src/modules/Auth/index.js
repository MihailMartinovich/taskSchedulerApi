import Router from 'koa-router';
import authController from './controllers/auth-controller';
import {AUTH_PREFIX} from "../../constants/prefixes";
import checkUserMiddleware from "../../middlewares/user/check-user";

const router = new Router({prefix: AUTH_PREFIX});

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/private',checkUserMiddleware(), (ctx) => {

  ctx.body = ctx.loggedUser;
});

export default router.routes();