import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
	auth: authReducer,
	// form is a special key required by redux-form
	form: formReducer
});