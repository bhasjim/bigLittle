// src/components/contact-card.js

import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


export default function ContactCard({contact, deleteContact}) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name='user outline'/> {contact.name}
        </Card.Header>
        <Card.Description>
          <Icon name='list'/> Big List
            <ol>
              {
                  contact.list.map(function(potentialBig){
                  return <li key={potentialBig}>{potentialBig}</li>
                })
              }
            </ol>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <div className="ui two buttons">
        <Link to={`/contacts/edit/${contact._id}`} className="ui basic button green">Edit</Link>
        <Button basic color="red" onClick={() => deleteContact(contact._id)} >Delete</Button>
      </div>
      </Card.Content>
    </Card>
  )
}

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,

}
