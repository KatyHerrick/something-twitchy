import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {
	// Field component provides 'input' and 'meta' props
	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	}

	renderError ({ error, touched }) {
		if (touched && error) {
			return <div className="ui pointing label">{error}</div>;
		}
		return null;
	}

	onSubmit = (formValues) => {
		this.props.createStream(formValues);
	}

	render() {
		return (
			// redux-form provides handleSubmit(fn) through props.
			<form
				onSubmit={this.props.handleSubmit(this.onSubmit)}
				className="ui form error"
			>
				<Field name="title" label="Enter Title" component={this.renderInput} />
				<Field
					name="description"
					component={this.renderInput}
					label="Enter Description"
				/>
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}

const validate = (formValues) => {
	const errors = {};

	if (!formValues.title) {
		errors.title = 'Title is required';
	}
	if (!formValues.description) {
		errors.description = 'Description is required';
	}

	return errors;
}

const formWrapped = reduxForm({
	form: 'streamCreate',
	validate
})(StreamCreate);

export default connect(
	null,
	{ createStream }
)(formWrapped);