import { createStore, combineReducers } from 'redux';
import allReducer from '../reducers/allReducer';

// const rootReducer = combineReducers(
//   {
//     allReducer
//   }
// );
const configureStore = createStore(allReducer)
export default configureStore;