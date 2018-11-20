import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import "./index.css";

import reducers from "./redux/reducers";
import App from "./App";

import registerServiceWorker, { unregister } from "./registerServiceWorker";

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("foreign-wallet-root")
);

if (window._exilee_map && window._exilee_map.is_service_worker_works) {
  registerServiceWorker();
} else {
  unregister();
}
