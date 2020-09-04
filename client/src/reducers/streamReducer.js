import _ from 'lodash';
import {
	CREATE_STREAM,
	READ_STREAM,
	READ_STREAMS,
	UPDATE_STREAM,
	DELETE_STREAM
} from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case CREATE_STREAM:
		case READ_STREAM:
		case UPDATE_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case READ_STREAMS:
			return { ...state, ..._.mapKeys(action.payload, 'id') };
		case DELETE_STREAM:
			return _.omit(state, action.payload);
		default:
			return state;
	}
}