// import 'polyfills'
import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./app/store";
import App from "./app/App";

const persistor = persistStore(store);

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container is missing in the DOM.");
}

// Create a root for React 18
const root = ReactDOM.createRoot(container);

function render() {
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

render();

// Hot Module Replacement (HMR) for development
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./app/App", render);
}
