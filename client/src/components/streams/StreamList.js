import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { readStreams } from '../../actions';

class StreamList extends React.Component {
	componentDidMount() {
		this.props.readStreams();
	}

	renderStreams() {
		return this.props.streams.map(stream => {
			return (
				<div className="item" key={stream.id}>
					{this.renderAdminButtons(stream)}
					<i className="large middle aligned icon camera" />
					<div className="content">
						{stream.title}
						<div className="description">{stream.description}</div>
					</div>
				</div>
			);
		});
	}

	renderAdminButtons(stream) {
		if (stream.userId === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<Link to={`/streams/edit/${stream.id}`} className="ui button primary">
						Edit
					</Link>
					<button className="ui button negative">
						Delete
					</button>
				</div>
			);
		}
	}

	renderCreateButton() {
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: 'right' }}>
					<Link to="/streams/new" className="ui button primary">Create Stream</Link>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">{this.renderStreams()}</div>
				{this.renderCreateButton()}
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		currentUserId: state.auth.userId,
		streams: Object.values(state.streams) };
};

export default connect(
	mapStateToProps,
	{ readStreams }
)(StreamList);