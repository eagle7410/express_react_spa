/**
 * Created by igor on 23.04.17.
 */
import {combineReducers} from 'redux';
import {home} from './Home';
import {admin} from './Admin';

export default combineReducers({
	home,
	admin
})
