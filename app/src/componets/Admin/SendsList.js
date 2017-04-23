/**
 * Created by igor on 11.02.17.
 */
import React, {Component} from 'react';

export default class AdminSendsList extends Component {

	render() {
		let that = this;

		if (!that.props.isGetSends) {
			return <div />;
		}

		let rows = '<tr><td colSpan="3">Empty.</td></tr>';
		let sends = that.props.sends;

		if (sends && sends.length) {
			rows = '';

			sends.map(send => {
				rows += `<tr><td>${send.name}</td><td>${send.email}</td><td>${send.text.replace(/\n/g, '<br>')}</td></tr>`;
				return send;
			});
		}

		return (
			<div>
				<table className="table table-striped">
					<thead>
					<tr>
						<th>User name</th>
						<th>Email</th>
						<th>Text</th>
					</tr>
					</thead>
					<tbody dangerouslySetInnerHTML={{__html: rows}} />
				</table>
			</div>
		);

	}
}
