import { NextFunction, Request, Response } from 'express';
import { hashPassword } from '../../utils/hashPasswords';
import { userActivationToken } from '../../utils/auth/tokenGenerator';
import { sendMail } from '../../utils/sendMail';
import { User } from '../../db/models/user';
/**
 * Users controller that registers the user with information given in the body of the request.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
export default async function usersRegister(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const user = req.body.user;
	try {
		// Create the new user on the database
		const users = await User.create({
			name: user.name,
			email: user.email,
			password: user.password,
		});
		console.log(users);
		// Create the authentication token for future use
		const activationToken = userActivationToken(user);
		if (!process.env.BASE_URL)
			throw new Error('BASE_URL missing in environment.');
		const activationUrl = `${process.env.BASE_URL}activation/${activationToken}`;
		res.status(201).json({
			success: true,
			message: `Please check your email: ${user.email} to activate your account!`,
		});
		await sendMail({
			to: user.email,
			from: 'analoguee8.4@gmail.com',
			content: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
			subject: 'Activate your account',
		});
	} catch (error) {
		return next(error);
	}
}
