import * as Router from 'koa-router';

export function configureSampleRoutes(router: Router) {
	router.get('/', context => context.body = 'Test');
	router.get('/error', () => { throw new Error('Error') });
	router.get('/api/test', context => context.body = { message: 'json message' });
	router.post('/', context => {
		console.log(context.request.body);
		context.body = 'Nice!';
	});
	// router.get('*', context => context.body = 'Hello World');
	return router;
}
