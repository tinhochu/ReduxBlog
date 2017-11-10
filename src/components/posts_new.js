import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from "../actions/index";

class PostsNew extends Component {



	renderField(field) {
		const { meta: { touched, error }  } = field;
		const className = `form-group ${ touched && error ? 'has-danger' : '' }`;

		return(
			<div className={className}>
				<label>{ field.label }</label>
				<input
					className="form-control"
					type="text"
					{ ...field.input }
				/>
				<div className="text-help">
					{ ( touched ?  error : '' ) }
				</div>

			</div>
		);
	}
	
	onSubmit(values){
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});
	}

	render() {

		const { handleSubmit } = this.props;


		return (
			<div>
				<h3>New Post</h3>
				<form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
					<Field
						label="Title"
						name="title"
						component={ this.renderField }
					/>
					<Field
						label="Categories"
						name="categories"
						component={ this.renderField }
					/>
					<Field
						label="Post Content"
						name="content"
						component={ this.renderField }
					/>

					<button type="submit" className="btn btn-primary">Submit</button>
					<Link className="btn btn-danger" to="/">Cancel</Link>
				</form>
			</div>
		);
	}
}

function validate(values){ //values contains all the fields with the values
	const errors = {};

	// Validate the inputs from 'values'

	if(!values.title) {
		errors.title = "Enter a title!";
	}
	if(!values.categories) {
		errors.categories = "Enter a Categories!";
	}
	if(!values.content) {
		errors.content= "Enter a Content for the post!";
	}

	// if errors in empty, the form is fine to submit

	// if error has *any* properties, redux form assumes for in invalid
	return errors;
}

export default reduxForm({
	form: 'PostNewForm',
	validate
})(
	connect(null, { createPost })(PostsNew)
);