import React from "react";
import store from "app/store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

// @ts-ignore
import TestRenderer from "react-test-renderer";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";

describe("Dashboard Component", () => {
  // it("Check if it matches snapshot", async () => {
  //   const tree = TestRenderer.create(
  //     <Provider store={store}>
  //       <Dashboard />
  //     </Provider>
  //   ).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it("Check if UI elements available after componet loads", () => {
    // const { getByTestId } = render(
    //   <Provider store={store}>
    //     <Dashboard />
    //   </Provider>
    // );
    // expect(getByTestId("test-client")).toBeInTheDocument();
    // expect(getByTestId("test-client").textContent).toEqual("Dashboard");
  });

  afterEach(cleanup);
});
