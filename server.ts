import * as Koa from 'koa';
import * as bodyParser from 'koa-json-body';
import * as serve from 'koa-static';
import * as cors from 'koa-cors';
import { router } from './api';
import { authenticate } from './api/login';
import { connect } from './api/database';

export const app = new Koa();
const port = process.env.npm_package_config_port || 3000;

connect().then(() => console.log('Connected to mongoose...'))
		 .catch(error => console.error('Error connecting to mongoose:', error));

app.use(errorHandler());
app.use(cors());
app.use(authenticate());
   
app.use(serve(__dirname));

app.use(bodyParser());

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
