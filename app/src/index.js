import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from './reducers';
import { BrowserRouter as Router } from 'react-router-dom'

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
	<Provider store={store}>
		<Router><App /></Router>
	</Provider>,
	document.getElementById('root')
);

