// src/reducers/index.js

import { combineReducers } from 'redux';
import ContactReducer from './contact-reducer';
import { reducer as formReducer } from 'redux-form'; // for forms

const reducers = {
  contactStore: ContactReducer,
  form: formReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
