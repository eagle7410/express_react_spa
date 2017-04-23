/**
 * Created by igor on 23.04.17.
 */
import React, {Component} from 'react';

export default class LoadIcon extends Component {
	render() {
		return this.props.isLoad
			? <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
			: <span />;

	}
}
