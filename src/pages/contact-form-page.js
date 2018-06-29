// src/pages/contact-form-page

import React, { Component} from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { newContact, saveContact, fetchContact, fetchContacts, fetchLittles, fetchBigs, updateContact, deleteContact } from '../actions/contact-actions';
import ContactForm from '../components/contact-form';
import ContactList from '../components/contact-list';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { Field, reduxForm, reset } from 'redux-form';







class ContactFormPage extends Component {

  state = {
    redirect: false
  }


  componentDidMount = () => {
    const { _id } = this.props.match.params;
    if(_id){
      this.props.fetchContact(_id) //get the contact
    } else {
      this.props.newContact(); //make a new one
    }

    // this.props.fetchContacts(); //gets all the contacts

    if(this.props.location.pathname == "/"){
      this.props.fetchLittles();
    }
    else if(this.props.location.pathname == "/addBigs"){
      this.props.fetchBigs();
    }
  }


  continueToBigsButton = () => (
    <div>
    <Grid centered columns={2}>
      <Grid.Column>
      <Button as={Link} to='/addBigs' animated color="green" onClick={this.setRedirect}>
        <Button.Content visible>Continue to Add Bigs</Button.Content>
        <Button.Content hidden>
          <Icon name='right arrow' />
        </Button.Content>
      </Button>
      </Grid.Column>
    </Grid>
    </div>
  )

  //submitting a new contact
  submit = (contact) => {
    // console.log(this.props.location.pathname);
    // console.log(contact);

    //differentiates if its a big or little by the URL.
    if(this.props.location.pathname == "/"){
      contact.isBig = false;
    }
    else if(this.props.location.pathname == "/addBigs"){
      contact.isBig = true;
    }

    //if contact does not exist, then make a new one
    if(!contact._id) {
      return this.props.saveContact(contact)
        .then(response => this.setState({ redirect:true }))
        .catch(err => {
           throw new SubmissionError(this.props.errors)
         })
    } else { //if it exists we have to edit it.
      return this.props.updateContact(contact)
        .then(
            response =>{
              this.setState({ redirect:true });
            }
          )
        .catch(err => {
           throw new SubmissionError(this.props.errors)
         })
    }
  }


  render() {
    return (
      <div>
        <ContactForm contact={this.props.contact} loading={this.props.loading} onSubmit={this.submit} />
        <Field name="continue" component={this.continueToBigsButton}/>
        <h1>List of Littles</h1>
        <ContactList contacts={this.props.contacts} deleteContact={this.props.deleteContact}/>
      </div>

    )
  }
}



//we have our state store, we just need to get info from it and put it in our props
//when we call a function, it puts it into those stores
//so we want to put that info into our props
//store comes from index.js which gets info from contact-reducer.js
//the return name of each case is the object. Ex: contacts: action.payload
function mapStateToProps(state) {
  return {
    //ex: info from state.contactStore.contact goes into our this.props.contact
    contact: state.contactStore.contact,
    errors: state.contactStore.errors,
    contacts : state.contactStore.contacts,
    littles: state.contactStore.littles

  }
}


//https://github.com/erikras/redux-form/issues/3424
//we do connect and then reduxForm because reduxForm needs to see my props first from the connect
ContactFormPage =  connect(
  mapStateToProps, {newContact, saveContact, fetchContact, fetchLittles, fetchBigs, fetchContacts, updateContact, deleteContact})(ContactFormPage);

export default reduxForm({
    form: 'littlesPage',
  })(ContactFormPage);
