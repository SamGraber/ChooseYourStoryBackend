import * as Router from 'koa-router';

import { INotification, Notification } from './model';

export function configureNotificationRoutes(router: Router) {
	router.get('/api/notifications', async (context, next) => {
		const userId = context.query.userId;

		if (!userId) {
			throw new Error('No user specified');
		}

		context.body = await Notification.find({ userId }).then(x => x);
		next();
	});
	return router;
}
