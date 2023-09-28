/* eslint-disable quotes */
import { Document, Model, model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IUser } from '../../utils/types/user';
import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../utils/secrets';
export interface IUserModel extends IUser, Document {
	token?: string;
	generateJWT(): string;
	setPassword(password: string): void;
	validPassword(password: string): boolean;
}

const userSchema = new Schema(
	{
		name: {
			type: Schema.Types.String,
			required: [true, "can't be blank"],
			lowercase: true,
		},
		password: {
			type: Schema.Types.String,
			required: true,
		},
		email: {
			type: Schema.Types.String,
			required: [true, "can't be blank"],
			lowercase: true,
			unique: true,
			match: [/\S+@\S+\.\S+/, 'is invalid'],
			index: true,
		},
		image: {
			type: Schema.Types.String,
			default: '',
		},
		hash: {
			type: Schema.Types.String,
		},
		salt: {
			type: Schema.Types.String,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.plugin(uniqueValidator, {
	message: 'is already taken.',
});

userSchema.methods.validPassword = function (
	password: string
): boolean {
	const hash = crypto
		.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
		.toString('hex');
	return this.hash === hash;
};

userSchema.methods.setPassword = function (
	password: string
) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto
		.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
		.toString('hex');
};

userSchema.methods.generateJWT = function (): string {
	const today = new Date();
	const exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign(
		{
			id: this._id,
			username: this.name,
			email: this.email,
			exp: exp.getTime() / 1000,
		},
		JWT_SECRET
	);
};

export const User: Model<IUserModel> = model<IUserModel>(
	'User',
	userSchema
);
