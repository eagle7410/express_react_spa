const nodemailer = require('nodemailer');
const config = require('../conf/mailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(config);

/**
 * Send email.
 * @param {object} data
 */
const send = (data) => new Promise((ok, bad) => {

	if (config.service === 'SERVICE') {
		console.log('Mail/send. Bad config for mailer.');
		return bad();
	}

	data = data || {};

	if (!data.to) {
		console.log('Mail/send. Not have send address.', data);
		return bad();
	}

	// setup email data with unicode symbols
	let mailOptions = {
		from: config.auth.user, // sender address
		to: data.to, // list of receivers
		subject: data.subject || '', // Subject line
		text: data.text || '', // plain text body
		html: data.html || '' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (e) => {
		if (!e) {
			return ok();
		}

		console.log(e);
		bad();
	});

});

/**
 * Send email, and use specified template.
 * @param {object} data
 */
const sendData = data => new Promise((ok, bad) => {
	send({
		subject: `Send from ${data.name}`,
		to: data.email,
		text: `Dear ${data.name}, here is the email body for you:\n${data.text} \n\nRegards`
	}).then(ok, bad);
});

module.exports = {
	send : send,
	sendData : sendData
};
