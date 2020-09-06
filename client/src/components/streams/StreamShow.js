import React from 'react';
import { connect } from 'react-redux';
import { readStream } from '../../actions';

class StreamShow extends React.Component {
	componentDidMount()  {
		this.props.readStream(this.props.match.params.id);
	}

	render() {
		return (
			<div>
				StreamShow {this.props.match.params.id}
			</div>
		);
	}
};

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id]
	}
};

export default connect(
	null,
	{ readStream }
)(StreamShow);