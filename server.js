const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const conf = require('./conf');
const app = express();
const db = require('./db');

// Connected to db
db.connect(conf.db)
	.then(() => {
		let mail = require('./libs/mail');

		// Response static
		app.use('/static', express.static('static'));
		// app.use('/', express.static('static/app'));

		// Show request stats in console.
		app.use(morgan('dev'));

		// Models
		let sends = db.model('sends');

		// parse application/json
		app.use(bodyParser.json());

		// parse application/x-www-form-urlencoded
		app.use(bodyParser.urlencoded({extended: true}));

		app.post('/send', (req, res) => {
			let data = req.body;
			sends.save(data)
				.then(r => mail.sendData(data))
				.then(r => {
					res.json({
						status: 'ok'
					})
				})
				.catch(e => {
					res.json({
						status: 'err',
						mess: e
					})
				});
		});

		app.get('/sends', sends.checkAccess, (req, res) => {
			sends.all()
				.then(r => {
					res.json({
						status: 'ok',
						data: r
					})
				}, e => {
					res.json({status: 'err'});
				});
		});

		// Run Server
		const port = conf.server.port || 3001;
		app.listen(port, () => console.log(`Server listener ${port}`));
	})
	.catch(e => console.log('Error', e));



