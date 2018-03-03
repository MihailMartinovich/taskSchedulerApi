import Router from 'koa-router';
import { initUnprotectedRoutes } from '../routeHandlers/unprotectedRoutes';
import { initProtectedRoutes } from '../routeHandlers/protectedRoutes';

import { API_PREFIX } from "../constants/prefixes";

const router = new Router({ prefix: API_PREFIX});

initUnprotectedRoutes(router);
initProtectedRoutes(router);

export default router.routes();