import Router from 'koa-router';
import taskController from './controllers/taskController';
import {TASK_PREFIX} from "../../constants/prefixes";
import checkUserMiddleware from "../../middlewares/user/checkUserPermissions";

const router = new Router({prefix: TASK_PREFIX});

router.get('/:id', taskController.get);
router.get('/', taskController.getAll);
router.post('/', taskController.create);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

export default router.routes();