import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import {IS_DEV} from '../utils/env';
import error from './error';
import getCurrentUser from '../middlewares/user/getCurrentUser';

export default (app) => {
  if(IS_DEV){
    app.use(logger());
  }

  app.use(error());
  app.use(bodyParser());
  app.use(getCurrentUser());
};