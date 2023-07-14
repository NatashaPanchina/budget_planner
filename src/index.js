import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { createRootReducer } from './reducers/Reducers';

import './index.css';
import App from './App.js';

const store = configureStore({
  reducer: createRootReducer,
  middleware: [thunk],
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
