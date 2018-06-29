import { client } from './';
const url = '/contacts';


//fetch data from contacts-data
export function fetchContacts(){
  //sends a dispatch to the store that an action occured
  return dispatch => {
    dispatch({
      type: 'FETCH_CONTACTS',
      payload: client.get(url)
    })
  }
}

//fetch data from contacts-data
export function fetchLittles(){
  //sends a dispatch to the store that an action occured

  //client.get(url) gets all the contacts from the endpoint of URL
  //but we put a params so we only get the ones where isBig= false/true
  return dispatch => {
    dispatch({
      type: 'FETCH_LITTLES',
      payload: client.get(url, {
        params: {
          isBig: false
        }
      })
    })
  }
}

export function fetchBigs(){

  //client.get(url) gets all the contacts from the endpoint of URL
  //but we put a params so we only get the ones where isBig= false/true
  return dispatch => {
    dispatch({
      type: 'FETCH_BIGS',
      payload: client.get(url, {
        params: {
          isBig: true
        }
      })
    })
  }
}


export function newContact() {
  return dispatch => {
    dispatch({
      type: 'NEW_CONTACT'
    })
  }
}

export function saveContact(contact) {

  //originally, contact.list is just names separated by newlines
  //turns contacts into an array takes out trailing entries
  if(contact && contact.list){
    var nameArray = contact.list.split('\n');
    for(var i = 0; i < nameArray.length; i++){
      var name = nameArray[i]; //adds a new line to the end again for update

      //adds a new line to the end again for update except last guy
      if (i != nameArray.length-1) name += "\n";
      if(name === "") nameArray.splice(i,1); //remove if empty
      else{
        //takes out trailing spaces on each entry
        while(name.charAt(name.length-1) === " ") name = name.slice(0,-1);
        nameArray[i] = name;

      }
    }
    //only reason why i do this is so it doesnt revert to an array on screen to the user
    //if you want to see what happens normally, uncomment the next line and change the dispatch to contact
    //contact.list = nameArray;
    var newContact = JSON.parse(JSON.stringify(contact)); //copies values of contact into newcontact
    newContact.list = nameArray;
  }

  //we are returning a function that returns an object
  //dispatch pretty much gives the reducer the info, so the reducer can figure it out
  return dispatch => {
    return dispatch({
      type: 'SAVE_CONTACT',
      payload: client.post(url, newContact)
    })
  }
}

export function fetchContact(_id) {
  return dispatch => {
    return dispatch({
      type: 'FETCH_CONTACT',
      payload: client.get(`${url}/${_id}`)
    })
  }
}

export function updateContact(contact) {

  //originally, contact.list is just names separated by newlines
  //turns contacts into an array takes out trailing entries
  if(contact && contact.list){
    var nameArray = contact.list.split('\n');
    for(var i = 0; i < nameArray.length; i++){
      var name = nameArray[i];
      if (i != nameArray.length-1) name += "\n"; //adds a new line to the end again for update except last guy
      if(name === "") nameArray.splice(i,1);
      else{
        //takes out trailing spaces on each entry
        while(name.charAt(name.length-1) === " ") name = name.slice(0,-1);
        nameArray[i] = name;

      }
    }
    //only reason why i do this is so it doesnt revert to an array on screen to the user
    //if you want to see what happens normally, uncomment the next line and change the dispatch to contact
    //contact.list = nameArray;
    var newContact = JSON.parse(JSON.stringify(contact)); //copies values of contact into newcontact
    newContact.list = nameArray;
  }
  return dispatch => {
    return dispatch({
      type: 'UPDATE_CONTACT',
      payload: client.put(`${url}/${contact._id}`, newContact)
    })
  }
}

export function deleteContact(_id) {
  return dispatch => {
    return dispatch({
      type: 'DELETE_CONTACT',
      payload: client.delete(`${url}/${_id}`)
    })
  }
}
