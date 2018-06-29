// src/store.js
/*
https://redux.js.org/docs/basics/
*
  The Store is the object that brings them together. The store has the following responsibilities:
  Holds application state;
  Allows access to state via getState();
  Allows state to be updated via dispatch(action);
  Registers listeners via subscribe(listener);
  Handles unregistering of listeners via the function returned by subscribe(listener).
*/

import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./reducers";

const middleware = composeWithDevTools(applyMiddleware(promise(), thunk));

export default createStore(rootReducer, middleware);
