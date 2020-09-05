import React from 'react';
import { connect } from 'react-redux';
import { readStream, updateStream } from '../../actions';

class StreamEdit extends React.Component {
	componentDidMount() {
		this.props.readStream(this.props.match.params.id);
	}

	render() {
		const { stream } = this.props;

		if (!stream) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				{stream.title}
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