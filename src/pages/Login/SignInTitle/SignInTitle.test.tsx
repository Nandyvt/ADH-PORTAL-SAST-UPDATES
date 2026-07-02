/* eslint-disable @typescript-eslint/no-redeclare */
import React from "react";
import store from "app/store";
import { Provider } from "react-redux";

// @ts-ignore

import { render, cleanup } from "@testing-library/react";

import SignInTitle from ".";

describe("AddClients Component", () => {
  /* it("Check if it matches snapshot", () => {
    const tree = TestRenderer.create(
      <Provider store={store}>
        <SignInTitle />
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  }); */

  it("Check if UI elements available after componet loads", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SignInTitle />
      </Provider>
    );

    expect(getByTestId("test-heading")).toBeInTheDocument();

    expect(getByTestId("test-heading").textContent).toEqual("Welcome to ADH");
  });

  afterEach(cleanup);
});
