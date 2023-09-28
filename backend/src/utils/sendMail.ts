import nodemailer from 'nodemailer';

interface Options {
	from: string;
	to: string;
	content: string;
	subject: string;
}
/**
 * create the mail transporter and sends mail
 * @param options information of the recipent email ,mail body
 * @returns void
 */
export const sendMail = async (options: Options) => {
	if (!process.env.SMTP_USER)
		throw new Error('SMTP_USER missing in environment.');
	if (!process.env.SMTP_PASS)
		throw new Error('SMTP_PASS missing in environment.');
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	});

	const mailOptions = {
		from: options.from,
		to: options.to,
		subject: options.subject,
		text: options.content,
	};

	await transporter.sendMail(mailOptions);
};
