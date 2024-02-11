import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider as ReduxProvider } from "react-redux"
import { store } from "./store/store"
import { UserProvider } from "./store/UserContext"
import { NextUIProvider } from '@nextui-org/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Providers = ({ children }) => {
  return (

    <ReduxProvider store={store}>
      <NextUIProvider>
        <UserProvider>{children}</UserProvider>
      </NextUIProvider>
    </ReduxProvider>
  )
}

root.render(
  <Providers>
    <App />
  </Providers>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
