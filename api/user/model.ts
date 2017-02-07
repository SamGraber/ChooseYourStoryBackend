import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
	name: string;
	friends: number[];
	stories: number[];
}

export const UserSchema = new Schema({
	name: String,
	friends: Array,
	stories: Array,
});

export const User: Model<IUser> = <any>model('User', UserSchema);
