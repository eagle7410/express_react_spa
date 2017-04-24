/**
 * Created by igor on 11.02.17.
 */
import React, {Component} from 'react';
import './Form.css';
import {all} from '../../api/Emails';
import {connect} from 'react-redux';
import {messBadServer} from '../../const';

// Componets
import LoadIcon from '../LoadIcon';
import Alert from '../Alert';

class AdminForm extends Component {
	constructor(props) {
		super(props);
		this.dataKeys = ['login', 'pass'];
	}

	handelSubmit(ev) {
		ev.preventDefault();
		let that = this;

		if (that.props.store.isLoad) {
			return;
		}

		let data = {};

		that.dataKeys.map(key => data[key] = that[key].value);

		this.props.onLoad(data);

		all(data)
			.then(r => {
				if (r.status === 'ok') {
					return this.props.onLoadSuccess(r.data);
				}

				that.props.onSetError(r.mess);

			}, e => {
				that.props.onSetError();
				console.log('Err/api/email/all/response', e);
			})
	}

	render() {
		let that = this;
		let mainClass = 'form-control mb-2 mr-sm-2 mb-sm-0';
		let type = '';
		let mess = '';

		if (that.props.store.error) {
			type = 'danger';
			mess = that.props.store.error;
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
					<LoadIcon isLoad={that.props.store.isLoad}/> Show
				</button>
			</form>
		);
	}
}

export default connect(
	state => ({
		store: state.admin
	}),
	dispatch => ({
		onLoad: data => dispatch({type: 'adminOnLoad', data: data}),
		onSetError: (error = messBadServer) => dispatch({type: 'adminOnSetError', data: error}),
		onLoadSuccess: data => dispatch({type: 'adminOnLoadSuccess', data: data}),
	})
)(AdminForm);
