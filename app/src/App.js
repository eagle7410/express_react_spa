// Libs
import React, { Component } from 'react';
import './App.css';
import {NavLink, Route} from 'react-router-dom';

// Componets
import AppHead from './componets/AppHead';
import Home from './componets/Home';
import Admin from './componets/Admin/';

class App extends Component {
	render() {
		return (
			<div className='App'>
				<AppHead/>
				<div className='App-body container'>
					<div className="menu row">
						<ul>
							<li><NavLink to="/" activeClassName="selected" exact>Home</NavLink></li>
							<li><NavLink to="/admin" activeClassName="selected" exact>Admin</NavLink></li>
						</ul>
					</div>
					<div className="row">
						<Route path="/" component={Home} exact/>
						<Route path="/admin" component={Admin} />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
