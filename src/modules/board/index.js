import Router from 'koa-router';
import boardController from './controllers/boardController';
import { BOARD_PREFIX } from "../../constants/prefixes";
import checkUserMiddleware from "../../middlewares/user/checkUserPermissions";

const router = new Router({prefix: BOARD_PREFIX});

router.get('/:id', boardController.get);
router.get('/', boardController.getAll);
router.post('/', boardController.create);
router.put('/:id', boardController.update);
router.delete('/:id', boardController.delete);

export default router.routes();