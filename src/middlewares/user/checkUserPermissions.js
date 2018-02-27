export default () => async (ctx, next) => {
  if(!ctx.loggedUser) {
    ctx.throw(403, { message: 'Forbidden'});
  }

  await next();
}