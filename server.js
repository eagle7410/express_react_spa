const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const conf = require('./conf');
const app = express();
const db = require('./db');

// Models
let users;
let stats;

// Connected to db
db.connect(conf.db)

	// Set first users
	.then(() => {
		// Models
		users = db.model('users');
		stats = db.model('stats');
		return users.firstUsers(conf.users)
	})
	.then(() => {

		stats.clear(conf.db.storeDays);

		// Collected data
		stats.collected();

		// Response static
		app.use('/static', express.static('static'));
		app.use('/', express.static('static/app'));

		// Show request stats in console.
		app.use(morgan('dev'));

		// parse application/json
		app.use(bodyParser.json());

		// parse application/x-www-form-urlencoded
		app.use(bodyParser.urlencoded({extended: true}));

		app.post('/login', (req, res) => {
			users.login(req.body)
				.then(token => res.json({token : token}))
				.catch(e => res.json({data : false}));
		});

		app.get('/users', users.authCheck, (req, res) => {
			users.all()
				.then(users => res.json({users : users}))
				.catch(e => res.json({users : false}));
		});

		app.post('/user', users.authCheck, (req, res) => {
			users.create(req.body)
				.then(() => res.json({success : true}))
				.catch(() => res.json({success : false}));
		});

		app.delete('/user/:login', users.authCheck, (req, res) => {
			users.removeByLogin(req.params.login)
				.then(() => res.json({success : true}))
				.catch(() => res.json({success : false}));
		});

		app.get('/stats/:from/:to', users.authCheck, (req, res) => {
			let p = req.params;
			stats.fromTo(p.from, p.to)
				.then(r => res.json({stats : r.length ? r : false}))
				.catch(() => res.json({stats: false}));

		});

		// Run Server
		const port = conf.server.port;
		app.listen(port, () => console.log(`Server listener ${port}`));
	})
	.catch(e => console.log('Error', e));



