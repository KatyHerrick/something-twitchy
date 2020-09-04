import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
	// Destructure input out of reduxForm's Field formProps
	renderInput({ input, label }) {
		// Syntactical sugar to pass all of the props down
		return (
			<div className="field">
				<label>{label}</label>
				<input {...input} />
			</div>
		);
	}

	onSubmit(formValues) {
		console.log(formValues);
	}

	render() {
		return (
			// redux-form provides handleSubmit(fn) through props.
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
				<Field name="title" label="Enter Title" component={this.renderInput} />
				<Field
					label="Enter Description"
					name="description"
					component={this.renderInput}
				/>
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'streamCreate'
})(StreamCreate);