/* eslint-disable import/extensions */
import React from "react";
import store from "app/store";
import { Provider } from "react-redux";

// @ts-ignore

import { render, cleanup, act } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import NotificationsSettings from "./index";

describe("Notification Setting Component", () => {
  /* it("Check if it matches snapshot", () => {
    const tree = TestRenderer.create(
      <Provider store={store}>
        <NotificationsSettings />
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  }); */

  it("Check if UI elements available after component loads", async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <NotificationsSettings />
        </Provider>
      </MemoryRouter>
    );
    await act(() => {
      expect(getByTestId("test-heading")).toBeInTheDocument();
      expect(getByTestId("test-heading").textContent).toEqual(
        "Notification Setting"
      );
    });
  });

  afterEach(cleanup);
});
