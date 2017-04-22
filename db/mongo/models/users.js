const util = require('utils-igor')(['obj', 'str', 'date']);

const db = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const shema = db.Schema({
	_id: {type: db.Schema.Types.ObjectId},
	login: {type: String, required: true, unique: true},
	pass: {
		type: String,
		set: pass => util.str.hash(pass)
	},
	token: {
		type: String,
		default: util.str.hash(Date.now() + 'secret')
	},
	created: {
		type: Date,
		default: new Date()
	},
	updated: {
		type: Date,
		default: new Date()
	}
});
const modelName = 'users';

shema.plugin(autoIncrement.plugin, modelName);
shema.index({token: 1, login: -1});
const Model = db.model(modelName, shema);

const firstUsers = users => new Promise((ok, cancel) => {
	Model.find().then(r => {

		if (r.length) {
			return ok();
		}

		Model.insertMany(users).then(ok, cancel);
	}, e => cancel(e));
});

const login = (data) => new Promise((ok, bad) => {

	if (!data.login || !data.pass) {
		return bad('No full data');
	}

	Model
		.findOne({login: data.login})
		.then(user => {
			if (user) {

				if (util.str.hash(data.pass) !== user.pass) {
					return bad('BadPass');
				}

				ok(user.token);
			}

			bad('NoUser');

		}, e => {
			console.log('!Db error login', e);
			bad('Db error');
		})
});

const all = () => new Promise((ok, bad) => {
	Model
		.find()
		.then(users => {
			if (!users.length) {
				return bad('NoUser');
			}

			let res = [];

			users.map(user => res.push({
				login: user.login
			}));

			ok(res);

		}, e => {
			console.log('!Db error login', e);
			bad('Db error');
		})
});

const create = (data) => new Promise((ok, bad) => {

	let user = new Model({
		login: data.login,
		pass: data.pass
	});

	user.save()
		.then(ok, e => {
			console.log('Err save user', data, e);
			bad();
		});
});

const authCheck = (req, res, next) => {
	let token = req.headers.token;

	if (!token) {
		return res.status(403).json({status: '403 Forbidden'});
	}

	Model.findOne({token: token})
		.then(r => {
			if (!r) {
				return res.status(403).json({status: '403 Forbidden'});
			}

			next();
		})
		.catch(e => {
			console.log('Error get user by token', token);
			res.status(403).json({status: '403 Forbidden'});
		})
};

const removeByLogin = login => new Promise((ok, bad) => {
	Model.findOneAndRemove({login: login})
		.then(ok)
		.catch(bad);
});

module.exports = {
	removeByLogin: removeByLogin,
	firstUsers: firstUsers,
	authCheck: authCheck,
	create: create,
	login: login,
	all: all
};
