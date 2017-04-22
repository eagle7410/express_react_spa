const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

module.exports.init = params => new Promise((ok, bad)  => {
	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://' + params.port + '/' + params.name , e => {

		if (e) {
			return bad(e);
		}

		mongoose.connection.on('error', e => console.log('Connection error:', e));
		mongoose.connection.once('open', function () {
			console.log(`~ Connected to db ${params.name}.`);
			autoIncrement.initialize(mongoose.connection);
			ok();
		});

	});
});
