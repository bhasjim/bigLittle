// src/components/contact-form

import React, { Component } from 'react';
import { Form, Grid, Button, Icon } from 'semantic-ui-react';
import { Field, reduxForm, reset } from 'redux-form';
import ContactList from './contact-list.js';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';



class ContactForm extends Component {

  //have this state so that when we click on it, and update is fulfilled
  //then we have the redirect as true
  constructor(props) {
    super(props);
    this.state={
      redirect:false
    }
    this.fixedComma = false;
  }



  componentWillReceiveProps = (nextProps) => { // Receive Contact data Asynchronously
    const { contact } = nextProps;
    this.setState({redirect: nextProps.redirect})

    if(contact._id !== this.props.contact._id) { // Initialize form only once, else will repeat
      this.props.initialize(contact) //populates the field when we edit
    }
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <Form.Field className={classnames({error:touched && error})}>
      <label>{label}</label>
      <input {...input} placeholder={"ex: Jake Smith"} type={type}/>
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  )


  renderTextArea = ({input, meta: { touched, error, warning }}) => {

    //   if(!this.fixedComma){
    //     var newInput = [];
    //     for (var i = 0; i < input.value.length; i++){
    //        var nameWithoutComma = input.value[i].spli
    //     }
    //     this.fixedComma = true;
    //  }


      //in the first go around it is not an array
      if(input.value.constructor===Array) {

        //joins the words together, which are separated by \n anyways
        //and stores them as a single element in the new Array
        //this is so they will all come out as a string on their own
        //lines instead of being separated by commas
        var array = [input.value.join("")];
        input.value = array;

      }

    return (
      <Form.Field>
          <label>Big Rankings</label>
          <div>
              <textarea {...input} placeholder="Input big rankings here (order matters and separate entries with ENTER)." rows="10"/>
              {touched && error && <span className="error">{error.message}</span>}
          </div>
      </Form.Field>
  )};


  rerouteToMainPage = () => {
    // some action...
    // then redirect
    // this.setState({redirect: true});
  }

  render() {
    //https://stackoverflow.com/questions/29244731/react-router-how-to-manually-invoke-link
    //allows render to catch the redirect when we click button. v4 had to google
    // if(this.state) {
    //   if (this.state.redirect) {
    //     return <Redirect push to="/" />;
    //   }
    // }
    //details about the page. Inherent.
    const { handleSubmit, pristine, submitting, loading, reset } = this.props;
    // const { from } = this.props.location.state || '/'

    //This is set from the parent component
    if (this.state.redirect) {
      return (
      <Redirect to="/"/>
      )
    }

    return (

      <Grid centered columns={2}>
        <Grid.Column>
          {/*
            If the id exists, we do edit contact, if not we do add new contact-->
          */
          /* Field name =  matches the field in contact.model.js in backend*/
          }
          <h1 style={{marginTop:"1em"}}>{this.props.contact._id ? 'Edit Contact' : 'Add Future Little'}</h1>
          <Form onSubmit={handleSubmit} loading={loading}>
            <Form.Group widths='equal'>
              <Field name="name" component={this.renderField} label="Little's Name"/>
            </Form.Group>
            <Field name="list" component={this.renderTextArea} type="text" rows="10"/>
            <Button primary type='submit' disabled={pristine || submitting}>Save</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

const afterSubmit = (result, dispatch) => {
  dispatch(reset('contact')); //FORM NAME WE GIVE IT BELOW

}



export default reduxForm({
  form: 'contact',
  onSubmitSuccess: afterSubmit
})(ContactForm);
