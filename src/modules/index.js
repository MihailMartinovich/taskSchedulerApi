import Router from 'koa-router';
import auth from './Auth/index';
import {API_PREFIX} from "../constants/prefixes";

const router = new Router({ prefix: API_PREFIX});

router.use(auth);

export default router.routes();