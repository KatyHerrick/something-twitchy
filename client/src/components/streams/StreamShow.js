import React from 'react';
import { connect } from 'react-redux';
import { readStream } from '../../actions';

class StreamShow extends React.Component {
	componentDidMount()  {
		this.props.readStream(this.props.match.params.id);
	}

	render() {
		if (!this.props.stream) {
			return <div>Loading...</div>
		}

		const { title, description } = this.props.stream;

		return (
			<div>
				<video style={{ width: '100%' }} controls />
				<h1>{title}</h1>
				<h5>{description}</h5>
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
	mapStateToProps,
	{ readStream }
)(StreamShow);