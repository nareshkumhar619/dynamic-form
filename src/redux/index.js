// redux/index.js
import { combineReducers, createStore } from 'redux';
import formReducer from './formReducers';

const rootReducer = combineReducers({
  form: formReducer,
});

const store = createStore(rootReducer);

export default store;
