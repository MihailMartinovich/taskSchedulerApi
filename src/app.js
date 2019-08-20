import Koa from 'koa2';
import cors from '@koa/cors';

import initializeConnectors from './connectors';
import initRoutes from './routeHandlers/';
import modules from './modules';

initializeConnectors();

const app = new Koa();

app.use(cors({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
}));

initRoutes(app);

app.use(modules);


app.use(async ctx => {
  ctx.body = '';
  ctx.status = 404;
});

export default app;