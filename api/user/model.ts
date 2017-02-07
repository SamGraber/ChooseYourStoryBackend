import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
	oauthId: string;
	name: string;
	picture: string;
	friends: number[];
	stories: number[];
}

export const UserSchema = new Schema({
	oauthId: String,
	name: String,
	picture: String,
	friends: Array,
	stories: Array,
});

export const User: Model<IUser> = <any>model('User', UserSchema);
