import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'
import { gapiCreds } from '../credentials/gapi';

class GoogleAuth extends React.Component {
	componentDidMount() {
		// The Google API is initially loaded with just one function: load().
		// gapi.load(service, cb) must be called to use anything useful.
		window.gapi.load('client:auth2', () => {
			// gapi.client.init() returns a Promise instead of receiving a callback.
			window.gapi.client.init({
				clientId: gapiCreds.clientId,
				scope: 'email'
			}).then(() => {
				this.auth = window.gapi.auth2.getAuthInstance();
				// Set initial isSignedIn state in redux store
				this.onAuthChange(this.auth.isSignedIn.get());
				// Add event listener to isSignedIn to update state
				this.auth.isSignedIn.listen(this.onAuthChange);
			});
		});
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn();
		} else {
			this.props.signOut();
		}
	}

	onSignInClick = () => {
		this.auth.signIn();
	}

	onSignOutClick = () => {
		this.auth.signOut();
	}

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button onClick={this.onSignOutClick} className="ui red google button">
					<i className="google icon" />
					Sign Out
				</button>
			);
		} else {
			return (
				<button onClick={this.onSignInClick} className="ui red google button">
					<i className="google icon" />
					Sign In with Google
				</button>
			);
		}
	}

	render() {
		return (
			<div>
				{this.renderAuthButton()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
	mapStateToProps,
	{ signIn, signOut }
)(GoogleAuth);