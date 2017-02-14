
import * as Router from 'koa-router';
import { configureLogin } from './login';
import { configureSampleRoutes } from './sampleRoutes';
import { configureUserRoutes } from './user';
import { configureNotificationRoutes } from './notification';

export const router = new Router();

configureLogin(router);
configureSampleRoutes(router);
configureUserRoutes(router);
configureNotificationRoutes(router);
