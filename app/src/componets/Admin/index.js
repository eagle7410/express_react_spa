import React, { Component } from 'react';

// Componets
import Form from './Form';
import SendsList from './SendsList';

export default class Admin extends Component {
	render() {
		return (
			<div className="send-form">
				<h2>Show sends</h2>
				<Form/>
				<SendsList/>
			</div>
		);
	}
}

