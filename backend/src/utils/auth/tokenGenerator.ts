import jwt from 'jsonwebtoken';
import { IUserModel } from '../../db/models/user';
import { IUser } from '../types/user';
/**
 * Creates a token containing the user information for future authorization.
 * @param user User information to create the token
 * @returns the token created
 */
export function createUserToken(user: IUserModel) {
	if (!process.env.JWT_SECRET_KEY_AUTH)
		throw new Error(
			'JWT_SECRET_KEY_AUTH missing in environment.'
		);
	const tokenObject = {
		user: {
			name: user.name,
			email: user.email,
			id: user.id,
		},
	};
	const userJSON = JSON.stringify(tokenObject);
	const token = jwt.sign(
		userJSON,
		process.env.JWT_SECRET_KEY_AUTH
	);
	return token;
}
export function userActivationToken(user: IUser) {
	if (!process.env.JWT_SECRET_KEY_ACTIVATION)
		throw new Error(
			'JWT_SECRET_KEY_ACTIVATION missing in environment.'
		);
	const tokenObject = {
		user: { name: user.name, email: user.email },
	};
	const userJSON = JSON.stringify(tokenObject);
	const token = jwt.sign(
		userJSON,
		process.env.JWT_SECRET_KEY_ACTIVATION
	);
	return token;
}
