import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import messageReducer from './redux/reducers/messageReducer';
import userReducer from './redux/reducers/userReducer';
import entryReducer from './redux/reducers/entryReducer';
import cartReducer from './redux/reducers/cartReducer';

export const rootReducer = combineReducers({
  messageReducer,
  userReducer,
  entryReducer,
  cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();