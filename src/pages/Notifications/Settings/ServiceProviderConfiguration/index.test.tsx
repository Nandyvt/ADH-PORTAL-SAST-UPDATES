/* eslint-disable import/extensions */
import React from "react";
import store from "app/store";
import { Provider } from "react-redux";

// @ts-ignore

import { render, cleanup } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import ServiceProviderConfiguration from "./index";

describe("ServiceProviderConfiguration Component", () => {
  /* it("Check if it matches snapshot", () => {
    const tree = TestRenderer.create(
      <Provider store={store}>
        <ServiceProviderConfiguration />
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  }); */

  it("Check if UI elements available after component loads", async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <ServiceProviderConfiguration apiStatus="post" />
        </Provider>
      </MemoryRouter>
    );
    // expect button

    expect(getByTestId("save-button")).toBeInTheDocument();
  });

  afterEach(cleanup);
});
