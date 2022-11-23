const mailer = require('nodemailer');
require('dotenv').config();

const transporter = mailer.createTransport({
	service: "gmail",
	port: 465,
	auth: {
		user: process.env.AUTH_EMAIL,
		pass: process.env.AUTH_PASSWORD,
	},
});

module.exports = transporter;