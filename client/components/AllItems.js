import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addItemThunk, setItemsThunk } from '../redux';

export const AllItems = (props) => {
  const { items, setItemsThunk, addItemThunk } = props;
  const [item, setItem] = useState({ itemName: '' });

  useEffect(() => {
    // once component is mounted, get our list of items
    setItemsThunk();
  }, []);

  const handleChange = (event) => {
    // update the appropriate property with the updated value
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  const handleSubmit = (item) => {
    // function to handle clicking submit button
    event.preventDefault();
    addItemThunk(item);
  };

  return (
    <div>
      <form onSubmit={() => handleSubmit(item)}>
        <span>
          <label>Add item: </label>
          <input
            name='itemName'
            type='text'
            placeholder='enter name'
            value={item.itemName}
            onChange={handleChange}
          />
        </span>
        <button type='submit'>Add</button>
      </form>
      {/* map over our list of items to show them on our page*/}
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

const mapState = (state) => {
  return {
    // our state is an array (as of now)
    items: state,
  };
};

const mapDispatch = (dispatch) => {
  // we use thunks middleware to handle async requests to interact with our store
  return {
    addItemThunk: (item) => dispatch(addItemThunk(item)),
    setItemsThunk: () => dispatch(setItemsThunk()),
  };
};

const ConnectedItemList = connect(mapState, mapDispatch)(AllItems);

export default ConnectedItemList;
