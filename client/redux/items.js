import axios from 'axios';

// this file contains the item sub-reducer

// empty array as initial state
const intialState = [];

// action constants
const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';

// action creators
export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    item,
  };
};

export const setItems = (items) => {
  return {
    type: SET_ITEMS,
    items,
  };
};

// thunks
export const addItemThunk = (item) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/items`, item);
      dispatch(addItem(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const setItemsThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/items`);
      dispatch(setItems(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// reducer for item list
export default function itemReducer(state = intialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items;
    case ADD_ITEM:
      return [...state, action.item];
    default:
      return state;
  }
}
