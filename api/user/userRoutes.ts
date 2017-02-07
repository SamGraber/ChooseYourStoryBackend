import * as Router from 'koa-router';

import { IUser, User } from './model';

export function configureUserRoutes(router: Router) {
	router.get('/api/profile', async (context, next) => {
		const profileInfo = context.query;
		await User.findOne({ 'oauthId': profileInfo.oauthId }).then(data => {
			if (data) {
				context.body = data;
			} else {
				return User.create(profileInfo).then(result => context.body = result);
			}
		});
		next();
	});
	router.get('/api/users', async (context, next) => {
		context.body = await searchUsers();
		next();
	});
	return router;
}

function searchUsers(): Promise<IUser[]> {
	return User.find({}).limit(50).then(x => x);
}
