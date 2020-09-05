import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import StreamForm from './StreamForm';
import { readStream, updateStream } from '../../actions';

class StreamEdit extends React.Component {
	componentDidMount() {
		this.props.readStream(this.props.match.params.id);
	}

	onSubmit = formValues => {
		this.props.updateStream(this.props.match.params.id, formValues);
	}

	render() {
		const { stream } = this.props;

		if (!stream) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<h3>Edit a Stream</h3>
				<StreamForm
					onSubmit={this.onSubmit}
					initialValues={_.pick(stream, 'title', 'description')} />
			</div>
		);
	}
};

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id]
	};
}

export default connect(
	mapStateToProps,
	{ readStream, updateStream }
)(StreamEdit);