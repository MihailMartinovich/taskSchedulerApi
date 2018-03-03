import Router from 'koa-router';
import taskController from './controllers/taskController';
import { TASK_PREFIX } from "../../constants/prefixes";
import checkUserPermissionsMiddleware from "../../middlewares/user/checkUserPermissions";

const taskRouter = new Router({prefix: TASK_PREFIX});

const initTaskRouter = (middleware) => {
  if(middleware) {
    taskRouter.use(middleware);
  }

  taskRouter.get('/:id', taskController.get);
  taskRouter.get('/', taskController.getAll);
  taskRouter.post('/', taskController.create);
  taskRouter.put('/:id', taskController.update);
  taskRouter.delete('/:id', taskController.delete);

  return taskRouter.routes();
};

export {
  taskRouter,
  initTaskRouter
};