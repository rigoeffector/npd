// import React from 'react';
import ReactDOM from "react-dom";
import "simplebar/src/simplebar.css";
import {Provider} from 'react-redux';

import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import storeConfig from './store/store.dev';
const store = storeConfig();
ReactDOM.render(
  <Provider store={store}>
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
 </Provider>,
  document.getElementById("root")
);
