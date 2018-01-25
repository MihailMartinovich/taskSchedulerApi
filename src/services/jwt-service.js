import jsonWebToken from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export default class JWTService {
  static generateToken(data){
    return jsonWebToken.sign(data, JWT_SECRET);
  }

  static verifyToken(token) {
    return jsonWebToken.verify(token, JWT_SECRET);
  }
}