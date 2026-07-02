/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "styles/global.scss";
import Routes from "routes";
import PermissionProvider from "services/PermissionManager/PermissionProvider";
import { fetchPermission } from "services/PermissionManager/Types";
import { defineCustomElements } from "@american-heart/aui/loader";
import { QueryClient, QueryClientProvider } from "react-query";
import "../registerWebComponents";

// Create a react-query client
const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  //  Defines all the web component to the global window object
  defineCustomElements(window);
  return (
    <PermissionProvider fetchPermission={fetchPermission()}>
      <QueryClientProvider client={reactQueryClient}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </QueryClientProvider>
    </PermissionProvider>
  );
}

export default App;
