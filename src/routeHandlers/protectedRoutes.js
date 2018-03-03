import _ from 'lodash';
import checkUserPermissionsMiddleware from "../middlewares/user/checkUserPermissions";
import { initTaskRouter } from "../modules/task/index";

import { initBoardRouter } from '../modules/board/index';

const initProtectedRoutes = router => {
  const taskRoutes = initTaskRouter(checkUserPermissionsMiddleware());
  const boardRoutes = initBoardRouter(checkUserPermissionsMiddleware());

  router.use(taskRoutes);
  router.use(boardRoutes);
};

export {
  initProtectedRoutes
}