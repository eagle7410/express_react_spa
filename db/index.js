let type;

module.exports = {
	model: name => require(`./${type}/models/${name}`),
	connect: (confDB) => new Promise((ok, bad) => {
		switch (confDB.type) {
			case 'mongo':
				type = 'mongo';
				return require('./mongo').init(confDB).then(ok, bad);

			default:
				throw new Error('No find type conections');
		}
	})

};
