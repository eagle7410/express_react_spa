const dns = require('dns');
const net = require('net');
const os = require('os');
const async = require('async');

const db = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const shema = db.Schema({
	_id: {type: db.Schema.Types.ObjectId},
	name: {type: String, required: true},
	email: {type: String, required: true},
	text: {type: String, required: true},
	created: {
		type: Date,
		default: new Date()
	}

});
const modelName = 'sends';

shema.plugin(autoIncrement.plugin, modelName);
const Model = db.model(modelName, shema);

const messNoExist = 'Email not exists';

/**
 * Check access for get sends.
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
const checkAccess = (req, res, next) => {

	let data = req.query;

	if (data.login === 'admin' && data.pass === 'test123') {
		return next();
	}

	res.status(403).json({mess: 'Access denied.'});
};

/**
 * Get all sends.
 */
const all = () => new Promise((ok, bad) => {
	Model
		.find()
		.sort({_id: -1})
		.then(sends => {

			let res = [];

			sends.map(send => res.push({
				name: send.name,
				email: send.email,
				text: send.text,
			}));

			ok(res);

		}, e => {
			console.log('!Db error all sends', e);
			bad('Db error');
		});
});

/**
 * Check exist all parameters.
 * @param {object}data
 */
const dataCheckRequire = data => new Promise((ok, bad) => {
	data = data || {};
	let mess = '';

	[
		'name',
		'email',
		'text',
	].map(field => {
		if (!data[field]) {
			mess += `Field ${field} is required \n`;
		}
	});

	if (mess) {
		return bad(mess);
	}

	ok();
});

/**
 * Check email is valid
 * @param {object} data
 */
const emailValid = data => new Promise((ok, bad) => {

	if (/^\S+@\S+$/.test(data.email)) {
		return ok();
	}

	bad('Invalid email');

});

/**
 * Check email is exist.
 * @param {object} data
 */
const emailExist = data => new Promise((ok, bad) => {
	let email = data.email;

	dns.resolveMx(email.split('@')[1], (err, addresses) => {
		if (err || addresses.length === 0) {
			return bad(messNoExist);
		}

		addresses = addresses.sort((a, b) => a.priority - b.priority);

		let res, undetermined;
		let cond = false, j = 0;
		let timeout = 5000;

		async.doWhilst((done) => {
				let conn = net.createConnection(25, addresses[j].exchange);
				let commands = ["helo " + addresses[j].exchange, `mail from: <${email}>`, `rcpt to: <${email}>`];
				let i = 0;
				conn.setEncoding('ascii');
				conn.setTimeout(timeout);
				conn.on('error', function () {
					conn.emit('false');
				});
				conn.on('false', () => {
					res = false;
					undetermined = false;
					cond = false;
					done(err, false);
					conn.removeAllListeners();
					conn.destroy();
				});
				conn.on('connect', () => {
					conn.on('prompt', () => {
						if (i < 3) {
							conn.write(commands[i]);
							conn.write('\r\n');
							i++;
						} else {

							res = true;
							undetermined = false;
							cond = false;
							done(err, true);
							conn.removeAllListeners();
							conn.destroy(); //destroy socket manually
						}
					});
					conn.on('undetermined', () => {
						j++;
						//in case of an unrecognisable response tell the callback we're not sure
						cond = true;
						res = false;
						undetermined = true;
						done(err, false, true);

						conn.removeAllListeners();
						conn.destroy(); //destroy socket manually

					});
					conn.on('timeout', () => {
						conn.emit('undetermined');
					});
					conn.on('data', (data) => {
						if (data.indexOf("220") == 0 || data.indexOf("250") == 0 || data.indexOf("\n220") != -1 || data.indexOf("\n250") != -1) {
							conn.emit('prompt');
						} else if (data.indexOf("\n550") != -1 || data.indexOf("550") == 0) {
							conn.emit('false');
						} else {
							conn.emit('undetermined');
						}
					});
				});
			}, () => {
				return j < addresses.length && cond
			}, (err) => {
				if (err) {
					return bad(messNoExist);
				}

				ok();

			}
		)
	});
});

/**
 * Save send.
 * @param {object} data
 */
const save = data => new Promise((ok, bad) => {

	dataCheckRequire(data)
		.then(() => emailValid(data))
		.then(() => emailExist(data))
		.then(() => {
			let send = new Model(data);
			send.save()
				.then(ok, e => {
					console.log('Err save send', data, e);
					bad();
				});
		})
		.catch(e => bad(e));
});

module.exports = {
	checkAccess: checkAccess,
	save: save,
	all: all
};
