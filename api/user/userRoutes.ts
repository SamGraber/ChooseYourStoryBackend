import * as Router from 'koa-router';

import { IUser, User } from './model';

export function configureUserRoutes(router: Router) {
	router.get('/api/users', async (context, next) => {
		context.body = await searchUsers();
		next();
	});
	return router;
}

function searchUsers(): Promise<IUser[]> {
	return User.find({}).limit(50).then(x => x);
}
