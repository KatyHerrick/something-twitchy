import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
	return (
		<div className="ui secondary pointing menu">
			<Link to="/" className="ui big label item yellow">Something Twitchy</Link>
			<div className="right menu">
				<Link to="/" className="item">All Streams</Link>
				<GoogleAuth />
			</div>
		</div>
	);
};

export default Header;