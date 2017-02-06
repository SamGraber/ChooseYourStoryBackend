import * as Koa from 'koa';
import * as Router from 'koa-router';
import { sign, verify } from 'jsonwebtoken';
import { key } from '../config/keys';

export function configureLogin(router: Router) {
	router.get('/login', context => context.body = 'login');
	router.get('/logout', context => {
		context.redirect('/login');
	});
	router.post('/login', context => {
		const params = context.request.body;
		if (params.username !== 'username' || params.password !== 'password') {
			return this.status = 400;
		}
		context.body = {
			token: sign(params, key),
			user: stripPassword(params),
		};
	});
	return router;
}

function stripPassword(user) {
	user.password = undefined;
	return user;
}

export function authenticate() {
	return (context: Koa.Context, next: { (): Promise<any> }) => {
		if (context.request.path == '/login' || context.request.path == '/test.html') {
			return next();
		}
		
		try {
			const token = context.request.headers['authentication'];
			context.state.user = verify(token.replace('Bearer ', ''), key);
			return next();
		} catch (error) {
			context.status = 401;
		}
	};
}
