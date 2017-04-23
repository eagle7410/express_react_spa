import React, { Component } from 'react';

// Componets
import Form from './Form';
import SendsList from './SendsList';

export default class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isGetSends : false,
			sends: []
		};
	}

	handleSends (sends) {
		this.setState({
			isGetSends : true,
			sends : sends
		});
	}
	render() {
		let that = this;

		return (
			<div className="send-form">
				<h2>Show sends</h2>
				<Form onSends={that.handleSends.bind(that)}/>
				<SendsList isGetSends={that.state.isGetSends} sends={that.state.sends}/>
			</div>
		);
	}
}
