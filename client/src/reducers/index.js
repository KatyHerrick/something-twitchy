import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
	auth: authReducer,
	streams: streamReducer,
	// form is a special key required by redux-form
	form: formReducer
});