import * as mongoose from 'mongoose'
import { dbConfig } from '../../config'

export function connect(): Promise<{}> {
	const connectionString = `mongodb://${dbConfig.dbHost}/${dbConfig.dbName}`;
	mongoose.connect(connectionString);
	const db = mongoose.connection;

	return new Promise((resolve, reject) => {
		db.on('error', err => reject(err));
		db.once('open', () => resolve());
	});
}
