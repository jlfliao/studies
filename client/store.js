import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import itemReducer from './redux';
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

let middleware = [
  // `withExtraArgument` gives us access to axios in our async action creators
  // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
  thunkMiddleware.withExtraArgument({ axios }),
];

// create our store with thunks middleware
export default createStore(itemReducer, applyMiddleware(...middleware));
