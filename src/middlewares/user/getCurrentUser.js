import JWTService from '../../services/jwt-service';
import {User} from '../../modules/user/index';

export default () => async (ctx, next) => {
  const { authorization } = ctx.headers;

  if(authorization) {
    try {
      const {email} = await JWTService.verifyToken(authorization);
      ctx.loggedUser = await User.findOne({ email });
    } catch (e) {
      console.log(e);
      ctx.throw(401, {message: 'Unathorized. (Invalid token)'});
    }
  }

  await next();
}