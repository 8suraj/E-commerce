import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../../utils/types';
import * as resp from '../../constants/response';
import validator from 'validator';
/**
 * This function is a middleware that validates the user information in the request in order to log the user.
 * If the request is malformed it responds accordingly and returns, stopping the flow of the express.
 * If the request is well formed, it passes control to the next handler.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
export default async function userRegisterValidator(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const errors: ValidationError = {};
	errors.body = [];
	if (!req.body) {
		errors.body.push('can&apos;t be empty');
		return res.status(400).json({ errors });
	}

	const { user } = req.body;
	if (!user) {
		errors.body.push('user object must be defined');
		return res.status(400).json({ errors });
	}

	const { password, email, name } = user;
	if (!password) {
		errors.body.push(resp.password.emptyPassword);
	}

	if (!email) {
		errors.body.push(resp.email.emptyEmail);
	}
	if (!validator.isEmail(email)) {
		errors.body.push(resp.email.invalidEmail);
	}

	if (!name) {
		errors.body.push(resp.name.emptyName);
	}
	if (!validator.isStrongPassword(password))
		errors.body.push(resp.password.strongPassword);

	if (errors.body.length)
		return res.status(400).json({ errors });
	next();
}
