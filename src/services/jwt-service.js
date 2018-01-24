import jsonWebToken from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export default class JWTService {
  static async generateToken(data){
    return await jsonWebToken.sign(data, JWT_SECRET);
  }

  static async verifyToken(token) {
    return await jsonWebToken.verify(token, JWT_SECRET);
  }
}