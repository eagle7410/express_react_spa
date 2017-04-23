/**
 * Created by igor on 11.02.17.
 */
import React, {Component} from 'react';

export default class Alert extends Component {
	render() {
		let that = this;
		let res = <div />;

		if (that.props.type && that.props.mess) {
			let cls = `alert alert-${that.props.type}`;
			res = <div className={cls}><span dangerouslySetInnerHTML={{__html: that.props.mess}}></span><br/>{that.props.attach}</div>
		}

		return res;

	}
}
