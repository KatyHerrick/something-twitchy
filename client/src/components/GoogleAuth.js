import React from 'react';
import { gapiCreds } from '../credentials/gapi';

class GoogleAuth extends React.Component {
	state = { isSignedIn: null };

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
				this.setState({ isSignedIn: this.auth.isSignedIn.get() });
				// Add event listener to isSignedIn to update state
				this.auth.isSignedIn.listen(this.onAuthChange);
			});
		});
	}

	onAuthChange = () => {
		this.setState({ isSignedIn: this.auth.isSignedIn.get() });
	}

	onSignInClick = () => {
		this.auth.signIn();
	}

	onSignOutClick = () => {
		this.auth.signOut();
	}

	renderAuthButton() {
		if (this.state.isSignedIn === null) {
			return null;
		} else if (this.state.onSignInClick) {
			return (
				<button onClick={this.onSignOutClick} className="ui red google button">
					<i className="google icon" />
					Sign Out
				</button>
			);
		} else {
			return (
				<button onClick={this.onSignIn} className="ui red google button">
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

export default GoogleAuth;