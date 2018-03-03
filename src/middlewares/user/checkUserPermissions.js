import { FORBIDDEN } from '../../constants/HTTPStatuses';

export default () => async (ctx, next) => {
  if(!ctx.loggedUser) {
    ctx.throw(FORBIDDEN, { message: 'Forbidden'});
  }

  await next();
}