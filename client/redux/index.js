// centralized file for all our reducers (if needed)
import itemReducer, {
  addItem,
  setItems,
  addItemThunk,
  setItemsThunk,
} from './items';

export { addItem, setItems, addItemThunk, setItemsThunk };
export default itemReducer;
