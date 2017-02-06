import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';
import * as cors from 'koa-cors';
import { router } from './api';
import { authenticate } from './api/login';

export const app = new Koa();
const port = process.env.npm_package_config_port || 3000;

app.use(errorHandler());
app.use(authenticate());
   
app.use(serve(__dirname));

app.use(bodyParser());
app.use(cors());

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(port, () => console.log(`Listening on port ${port}...`));

function errorHandler() {
	return async (context, next) => {
		try {
			await next();
		} catch (error) {
			console.log(error.message);
			context.body = 'Error';
		}
	};
}
