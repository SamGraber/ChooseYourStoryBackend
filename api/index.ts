
import * as Router from 'koa-router';
import { configureLogin } from './login';
import { configureSampleRoutes } from './sampleRoutes';

export const router = new Router();

configureLogin(router);
configureSampleRoutes(router);
