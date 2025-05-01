// import {createStore, applyMiddleware} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk';
import {loginReducer} from  './reducers/loginReducer';
import { composeWithDevTools } from '@redux-devtools/extension';


export const store = configureStore( {
  reducer: {
    login: loginReducer
  }
}


);