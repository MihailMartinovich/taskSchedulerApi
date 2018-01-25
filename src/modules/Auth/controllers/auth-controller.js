import pick from 'lodash';
import { User } from '../../user/';
import jwtService from '../../../services/jwt-service';

const SIGNIN_ERROR_NUMBER = 400;

class authController {
  static async signUp(ctx) {
    let newUserData = pick(ctx.request.body, User.createFields).value();
    let {_id} = await User.create(newUserData);
    let user = await User.findOneWithPublicFields({_id});
    ctx.body = {data: user};
  }

  static async signIn(ctx) {
    const {email, password } = ctx.request.body;
    if(!email || ! password){
      ctx.throw(SIGNIN_ERROR_NUMBER, 'Email or password is invalid');
    }

    const user = await User.findOne({email});
    if(!user){
      ctx.throw(SIGNIN_ERROR_NUMBER, 'user with specified email not found');
    }

    if(!user.comparePasswords(password)){
      ctx.throw(SIGNIN_ERROR_NUMBER, 'Email or password is invalid(password)');
    }

    const token = await jwtService.generateToken({ email });

    ctx.body = {data: token};
  }
}

export default authController;