import Koa from 'koa2';
import initializeConnectors from './connectors';
import initUnprotectedRoutes from './routeHandlers/unprotected-routes';
import modules from './modules';

initializeConnectors();
const app = new Koa();

initUnprotectedRoutes(app);

app.use(modules);

app.use(async ctx => {
  ctx.body = '<h1>summary</h1>';
});

export default app;