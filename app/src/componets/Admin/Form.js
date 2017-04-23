/**
 * Created by igor on 11.02.17.
 */
import React, {Component} from 'react';
import './Form.css';
import {all} from '../../api/Emails';

// Componets
import LoadIcon from '../LoadIcon';
import Alert from '../Alert';

let messBadServer = 'Sorry problem with server. :(';

export default class AdminForm extends Component {
	constructor(props) {
		super(props);
		this.dataKeys = ['login', 'pass'];
		this.state = {
			isLoad: false,
			isGetSends: false,
			error: false,
			sends: []
		};
	}

	handelSubmit(ev) {
		ev.preventDefault();
		let that = this;

		if (that.state.isLoad) {
			return;
		}

		that.state.data = {};
		let data = that.state.data;

		that.dataKeys.map(key => data[key] = that[key].value);

		that.setState({isLoad: true});

		this.props.onSends([]);

		all(data)
			.then(r => {
				if (r.status === 'ok') {
					this.props.onSends(r.data);
					return that.setState({
						error: false,
						isLoad: false
					});
				}

				that.setState({
					error: r.mess || messBadServer,
					isLoad: false
				});

			}, e => {
				that.setState({
					error: messBadServer,
					isLoad: false
				});
				console.log('Err/api/email/all/response', e);
			})
	}

	render() {
		let that = this;

		let mainClass = 'form-control mb-2 mr-sm-2 mb-sm-0';
		let type = '';
		let mess = '';

		if (that.state.error) {
			type = 'danger';
			mess = that.state.error;
		}

		return (
			<form name="form" onSubmit={ that.handelSubmit.bind(that) }
			      className="form-inline">
				<Alert type={type} mess={mess}/>
				<label className="sr-only" htmlFor="login">Login</label>
				<input id="login"
				       type="text"
				       className={mainClass}
				       name="login"
				       placeholder="Enter login"
				       ref={(input) => {
					       that.login = input;
				       }}
				       required
				/>
				<label className="sr-only" htmlFor="pass">Password</label>
				<input id="pass"
				       type="password"
				       className={mainClass}
				       name="pass"
				       placeholder="Enter password"
				       ref={(input) => {
					       that.pass = input;
				       }}
				       required
				/>
				<button type="submit" className="btn btn-primary">
					<LoadIcon isLoad={that.state.isLoad}/> Show
				</button>
			</form>
		);
	}
}
