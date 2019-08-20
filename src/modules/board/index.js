import Router from 'koa-router';
import boardController from './controllers/boardController';
import { BOARD_PREFIX } from '../../constants/prefixes';
import checkUserMiddleware from '../../middlewares/user/checkUserPermissions';

const boardRouter = new Router({prefix: BOARD_PREFIX});

const initBoardRouter = (middleware) => {
  if (middleware) {
    boardRouter.use(middleware);
  }
  boardRouter.get('/:id', boardController.get);
  boardRouter.get('/', boardController.getAll);
  boardRouter.post('/', boardController.create);
  boardRouter.put('/:id', boardController.update);
  boardRouter.put('/', boardController.updateSet);
  boardRouter.delete('/:id', boardController.delete);

  return boardRouter.routes();
};

export {
  boardRouter,
  initBoardRouter,
};