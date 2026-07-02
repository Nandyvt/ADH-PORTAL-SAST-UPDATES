/* eslint-disable @typescript-eslint/no-redeclare */
import React from "react";
import store from "app/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

// @ts-ignore

import { render, cleanup, act } from "@testing-library/react";

import Menu from "./Menu";

describe("AddClients Component", () => {
  /* it("Check if it matches snapshot", () => {
    const tree = TestRenderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <Menu />
        </Provider>
      </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  }); */

  it("Check if UI elements available after componet loads", async () => {
    const props = {
      match: {
        params: {
          id: 1234,
        },
      },
    };

    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <Menu />
        </Provider>
      </MemoryRouter>
    );

    await act(() => {
      expect(getByTestId("title")).toBeInTheDocument();
      expect(getByTestId("roles-dropdown")).toBeInTheDocument();
      expect(getByTestId("editor-wrapper")).toBeInTheDocument();
      expect(getByTestId("title").textContent).toEqual("Select Roles");
    });
  });

  afterEach(cleanup);
});
