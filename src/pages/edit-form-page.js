// src/pages/contact-form-page

import React, { Component} from 'react';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { newContact, saveContact, fetchContact, fetchContacts, updateContact, deleteContact } from '../actions/contact-actions';
import ContactForm from '../components/contact-form';
import ContactList from '../components/contact-list';
import {reset} from 'redux-form';




class EditFormPage extends Component {

  constructor(props) {
     super(props);
     this.state = {
       redirect: false
     };
  }


  componentDidMount = () => {
    const { _id } = this.props.match.params;
    if(_id){
      this.props.fetchContact(_id) //get the contact
    } else {
      throw "Not a valid contact";
    }

  }

  //submitting a new contact
  submit = (contact) => {
    if(!contact._id) { //if contact does not exist, then make a new one
      return this.props.saveContact(contact)
        .then(response => this.setState({ redirect:false }))
        .catch(err => {
           throw new SubmissionError(this.props.errors)
         })
    } else { //if it exists we have to edit it.
      return this.props.updateContact(contact)
        .then(
          response => {
            this.setState({ redirect:true })
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
      {/*HERE IS WHERE WE SET THE CHILD COMPONENT'S STATE.REDIRECT
        * In that part where I do ContactForm redirect={this.state.redirect}
        * translates to ContactForm's redirect = this component's redirect
        * Because once we edit/update, we set the redirect to true
      */}
        <ContactForm redirect={this.state.redirect} contact={this.props.contact} loading={this.props.loading} onSubmit={this.submit} />
      </div>

    )
  }
}

//we have our state store, we just need to get info from it and put it in our props
function mapStateToProps(state) {
  return {
    contact: state.contactStore.contact,
    errors: state.contactStore.errors,
    contacts : state.contactStore.contacts

  }
}

export default connect(
  mapStateToProps, {newContact, saveContact, fetchContact, fetchContacts, updateContact, deleteContact})(EditFormPage);
