import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';

export class TodoForm extends Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return (
       <div className="ui error message">
         <div className="header">{error}</div>
       </div>
      );
    };
  };

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error": ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
       <input {...input} autoComplete="off" />
       {this.renderError(meta)}
      </div> 
    );
  };

  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.onSubmit(formValues);
  };

  render() {
    console.log(this.props)
    return (
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button className="ui button green">Submit</button>
      </form>
    );
  }
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title= "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "you must enter a description";
  }
  return errors;
}

export default reduxForm({ form: "todoForm", validate: validate })(TodoForm);