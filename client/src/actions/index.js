import streams from '../apis/streams';
import history from '../history';
import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	READ_STREAM,
	READ_STREAMS,
	UPDATE_STREAM,
	DELETE_STREAM
} from './types';

export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT
	};
};

export const createStream = formValues => async (dispatch, getState) => {
	const { userId } = getState().auth;
	const response = await streams.post('/streams', { ...formValues, userId });

	dispatch({ type: CREATE_STREAM, payload: response.data });
	// Automatically navigate the user back to StreamList.
	history.push('/');
}

export const readStream = (id) => async dispatch => {
	const response = await streams.get(`/streams/${id}`);
	dispatch({ type: READ_STREAM, payload: response.data });
}

export const readStreams = () => async dispatch => {
	const response = await streams.get('/streams');
	dispatch({ type: READ_STREAMS, payload: response.data });
}

export const updateStream = (id, formValues) => async dispatch => {
	const response = await streams.patch(`/streams/${id}`, formValues);

	dispatch({ type: UPDATE_STREAM, payload: response.data });
	history.push('/');

}

export const deleteStream = (id) => async dispatch => {
	await streams.delete(`/streams/${id}`);
	dispatch({ type: DELETE_STREAM, payload: id });
}
