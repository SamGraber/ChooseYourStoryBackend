import * as Router from 'koa-router';

import { INotification, Notification } from './model';
import { NotificationType } from './notification.enum';
import { getUserById } from '../user';

export function configureNotificationRoutes(router: Router) {
	router.post('/api/friendrequest', async (context, next) => {
		const requesterId = context.body.userId;
		const targetUserId = context.body.requestedFriendId;
		await getUserById(requesterId).then(requester => {
			const friendRequest = {
				userId: targetUserId,
				type: NotificationType.friendRequest,
				message: `${requester.name} wants to be friends`,
				requesterId,
			};
			return Notification.create(friendRequest).then(result => context.body = result);
		});
		next();
	});
	
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
