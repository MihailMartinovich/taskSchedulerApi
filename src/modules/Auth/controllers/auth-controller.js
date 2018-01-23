import pick from 'lodash';
import {User} from '../../User/';

class authController {
  static async signUp(ctx) {
    let newUserData = pick(ctx.request.body, User.createFields).value();
    let {_id} = await User.create(newUserData);
    let user = await User.findOneWithPublicFields({_id});
    ctx.body = {data: user};
  }
}

export default authController;