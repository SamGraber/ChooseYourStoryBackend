
import * as Router from 'koa-router';
import { configureLogin } from './login';
import { configureSampleRoutes } from './sampleRoutes';
import { configureUserRoutes } from './user';

export const router = new Router();

configureLogin(router);
configureSampleRoutes(router);
configureUserRoutes(router);
