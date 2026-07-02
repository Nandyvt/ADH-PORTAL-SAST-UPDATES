/* eslint-disable @typescript-eslint/no-redeclare */
import React from "react";
import store from "app/store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

// @ts-ignore

import TestRenderer from "react-test-renderer";

import { render, cleanup, fireEvent, act } from "@testing-library/react";

import CONSTANTS from "common/constants";
import FormHeader from ".";

describe("AddClients Component", () => {
  /* it("Check if it matches snapshot", async () => {
    const tree = TestRenderer.create(
      <Provider store={store}>
        <FormHeader />
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  }); */

  it("Check if UI elements available after componet loads", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <FormHeader />
      </Provider>
    );

    expect(getByTestId("test-heading")).toBeInTheDocument();

    expect(getByTestId("test-heading").textContent).toEqual(
      "American Heart Association"
    );
  });

  afterEach(cleanup);
});
