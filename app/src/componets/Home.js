import React, {Component} from 'react';
import {keys} from '../utils/Obj';
import {send} from '../api/Emails';

// Componets
import LoadIcon from './LoadIcon';
import Alert from './Alert';

let messBadServer = 'Sorry problem with server. :(';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.dataKeys = ['name', 'email', 'text'];
		this.state = {
			isSend: false,
			isSendCreate: false,
			errors: {},
			data: {}
		}
	}

	handelSubmit(ev) {
		ev.preventDefault();
		let errors = {};
		let that = this;

		if (that.state.isSend) {
			return;
		}

		that.state.data = {};
		let data = that.state.data;

		that.dataKeys.map(key => {
			let el = that[key];

			if (!el.valid && el.validationMessage) {
				errors[key] = that[key].validationMessage
			} else {
				data[key] = that[key].value;
			}

			return key;
		});

		if (keys(errors).length) {
			return that.setState({
				errors: errors,
				isSend: false
			});
		}
		that.setState({isSend: true});

		send(data)
			.then(r => {

				if (r.status === 'ok') {
					return that.setState({
						errors: {},
						isSendCreate: true,
						isSend: false
					});
				}

				that.setState({
					errors: {
						share: r.mess ? r.mess.replace(/\n/g, '<br>') : messBadServer
					},
					isSend: false
				});

			}, e => {
				that.setState({
					errors: {
						share: messBadServer
					},
					isSend: false
				});
				console.log('Err/api/email/send/response', e);
			})
	}

	handelReset() {
		let that = this;

		that.form.reset();
		that.setState({
			isSend: false,
			isSendCreate: false,
			errors: {},
			data: {}
		});

	}

	alertData(isHaveError) {
		let res = {
			type: '',
			mess: ''
		};
		let that = this;
		let state = that.state;
		let err = state.errors;

		if (isHaveError && err.share) {
			res = {
				type: 'danger',
				mess: err.share
			};
		} else if (state.isSendCreate) {
			res = {
				type: 'success',
				mess: 'Thank you for using application!'
			};
		}

		return res;
	}

	render() {
		let that = this;
		let state = that.state;
		let isHaveError = state.errors && keys(state.errors).length;
		let cssClassMessage = {};

		that.dataKeys.map(key => {
			let isHasErr = isHaveError && state.errors[key];
			let mainClass = 'form-group';

			cssClassMessage[key] = {
				mess: isHasErr ? <div className="help-block">{state.errors[key]}</div> : '',
				cls: isHasErr ? `${mainClass} has-error` : mainClass
			};

			return key;
		});

		let link = '';
		let formCls = '';

		if (state.isSendCreate) {
			formCls = 'hide';
			link = <a onClick={that.handelReset.bind(that)}>Try again</a>;
		}

		return (
			<div className="send-form">
				<h2>Send email</h2>
				<Alert {... that.alertData(isHaveError)} attach={link}/>
				<form name="form" noValidate="novalidate"
				      className={formCls}
				      onSubmit={ that.handelSubmit.bind(that) }
				      ref={(form) => {
					      that.form = form;
				      }}
				>
					<div className={cssClassMessage.name.cls}>
						<input id="name"
						       type="text"
						       className="form-control"
						       name="name"
						       placeholder="Enter Name"
						       ref={(input) => {
							       that.name = input;
						       }}
						       required
						/>
						{cssClassMessage.name.mess}
					</div>
					<div className={cssClassMessage.email.cls}>
						<input id="email"
						       type="text"
						       className="form-control"
						       name="email"
						       placeholder="Enter email address"
						       ref={(input) => {
							       that.email = input;
						       }}
						       required
						/>
						{cssClassMessage.email.mess}
					</div>
					<div className={cssClassMessage.text.cls}>
						<textarea id="text"
						          className="form-control"
						          name="text"
						          placeholder="Enter send text"
						          ref={(area) => {
							          that.text = area;
						          }}
						          required
						/>
						{cssClassMessage.text.mess}
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							<LoadIcon isLoad={that.state.isSend}/> Send
						</button>
					</div>
				</form>
			</div>
		);
	}
}
