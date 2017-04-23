/**
 * Created by igor on 11.02.17.
 */
import React, { Component } from 'react';

export default class AppHead extends Component {
	render()  {
		return (
			<div className="App-header">
				<h1>Create Simple application with express, reactJS</h1>
				<div>Copyright (c) 2017
					<a
						className="App-header-link"
						href="https://github.com/eagle7410/express_react_spa"
						target="_blank"
					>Igor Stcherbina </a>
				</div>
			</div>
		);
	}
}
