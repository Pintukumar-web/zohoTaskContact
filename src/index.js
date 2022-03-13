import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {firebaseApp,provider,db,FieldValue} from "./lib/firebase"
import FirebaseContext from './context/firebase';

ReactDOM.render(
  <BrowserRouter> 
  <FirebaseContext.Provider value={{firebaseApp,provider,db,FieldValue}}>
      <App />  
      </FirebaseContext.Provider>
    </BrowserRouter>,
  document.getElementById('root')
);

