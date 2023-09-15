import React from 'react';
import ReactDOM from 'react-dom/client';
import AppNew2 from './AppNew2/AppNew2';
import './index.css';
import AppNew from './New/AppNew.js'
import AuthProvider from './context/auth/Provider'
// import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <AppNew/> */}
    <AuthProvider><AppNew2 /></AuthProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
