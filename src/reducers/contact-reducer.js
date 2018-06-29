// src/reducers/contact-reducer.js
// all a reducer does is it takes previous state and action,
// and it returns the next state

const defaultState = {
  contacts: [],
  littles: [],
  contact: {name:{}},
  loading: false,
  errors: {}
}

//if state and action are undefined, those are its default values
export default (state=defaultState, action={}) => {
  switch (action.type) {

    case 'FETCH_CONTACTS': {
      return {
        //object spread syntax
        //copies to a new state with the new contact
        ...state,
        contacts: action.payload
      }
    }
    case "FETCH_CONTACTS_FULFILLED": {

      return {
        ...state,
        contacts: action.payload.data.data || action.payload.data // in case pagination is disabled
      }
    }
    case 'FETCH_LITTLES': {
      return {
        //object spread syntax
        //copies to a new state with the new contact
        ...state,
        contacts: action.payload
      }
    }
    case "FETCH_LITTLES_FULFILLED": {

      return {
        ...state,
        contacts: action.payload.data.data || action.payload.data // in case pagination is disabled
      }
    }
    case 'FETCH_BIGS': {
      return {
        //object spread syntax
        //copies to a new state with the new contact
        ...state,
        contacts: action.payload
      }
    }
    case "FETCH_BIGS_FULFILLED": {

      return {
        ...state,
        contacts: action.payload.data.data || action.payload.data // in case pagination is disabled
      }
    }
    case 'NEW_CONTACT': {

      return {
        ...state,
        contact: {name:{}}
      }
    }

    case 'SAVE_CONTACT_PENDING': {
      return {
        ...state,
        loading: true
      }
    }

    case 'SAVE_CONTACT_FULFILLED': {
      // console.log(action.payload);
      // console.log(action.payload.data.list[0]);

      return {
        ...state,
        contacts: [...state.contacts, action.payload.data],
        errors: {},
        loading: false
      }
    }

    case 'SAVE_CONTACT_REJECTED': {
      const data = action.payload.response.data;
      // convert feathers error formatting to match client-side error formatting
      const { name, list } = data.errors;
      const errors = { global: data.message, name, list };
      return {
        ...state,
        errors: errors,
        loading: false
      }
    }
    case 'FETCH_CONTACT_PENDING': {
      return {
        ...state,
        loading: true,
        contact: {name:{}}
      }
    }

    case 'FETCH_CONTACT_FULFILLED': {
      return {
        ...state,
        contact: action.payload.data,
        errors: {},
        loading: false
      }
    }

    case 'UPDATE_CONTACT_PENDING': {
      return {
        ...state,
        loading: true
      }
    }

    case 'UPDATE_CONTACT_FULFILLED': {
      const contact = action.payload.data;
      return {
        ...state,
        contacts: state.contacts.map(item => item._id === contact._id ? contact : item),
        errors: {},
        loading: false
      }
    }

    case 'UPDATE_CONTACT_REJECTED': {
      const data = action.payload.response.data;
      const { name, list } = data.errors;
      const errors = { global: data.message, name, list };
      return {
        ...state,
        errors: errors,
        loading: false
      }
    }
    case 'DELETE_CONTACT_FULFILLED': {
      const _id = action.payload.data._id;
      return {
        ...state,
        contacts: state.contacts.filter(item => item._id !== _id)
      }
    }
    default:
      return state;
  }
}
