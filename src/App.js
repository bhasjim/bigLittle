// src/App.js

import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ContactListPage from './pages/contact-list-page';
import ContactFormPage from './pages/contact-form-page';
import EditFormPage from './pages/edit-form-page';


class App extends Component {
  render() {
    return (
      <Container>
        <div className="ui two item menu">
        <NavLink className="item" activeClassName="active" exact to="/">
          Add Big/Little
        </NavLink>
        <NavLink className="item" activeClassName="active" exact to="/contacts/existing">
          Contacts List
        </NavLink>
        </div>
        <Route exact path="/" component={ContactFormPage}/>
        <Route path="/contacts/existing" component={ContactListPage}/>
        <Route path="/contacts/edit/:_id" component={EditFormPage}/>
        <Route path="/addBigs" component={ContactFormPage}/>
      </Container>
    );
  }
}

export default App;
