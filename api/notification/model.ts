import { model, Schema, Model, Document } from 'mongoose';
import { NotificationType } from './notification.enum';

export interface INotification extends Document {
	userId: string;
	type: NotificationType;
	message: string;
}

export interface IFriendRequest extends INotification {
	requesterId: string;
}

export const NotificationSchema = new Schema({
	userId: String,
	type: Number,
	message: String,
	requesterId: String,
});

export const Notification: Model<INotification> = <any>model('Notification', NotificationSchema);
