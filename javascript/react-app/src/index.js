import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import store from 'redux-state-control/lib/store/store';
import App from './Components/App';


  
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )