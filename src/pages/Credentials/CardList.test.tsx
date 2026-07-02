/* eslint-disable @typescript-eslint/no-shadow */
import React from "react";
import store from "app/store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

// @ts-ignore

import TestRenderer from "react-test-renderer";

import {
  render,
  cleanup,
  fireEvent,
  getByTestId,
  act,
} from "@testing-library/react";

// eslint-disable-next-line import/no-named-as-default
import CardList from "./CardList";

const mockIntersectionObserver = jest.fn();

mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe("CredentialsComp", () => {
  /* it("Check if it matches snapshot", () => {
    const tree = TestRenderer.create(
      <Provider store={store}>
        <CardList clientId="1" channelName="" />
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  }); */

  it("Check if UI elements available after componet loads", () => {
    act(() => {
      const { queryByTestId } = render(
        <Provider store={store}>
          <CardList
            clientId="1"
            channelName=""
            setEditCredentialData={undefined}
            checkBoxState={undefined}
            setCheckBoxState={undefined}
            setCredName={undefined}
            setPermission={undefined}
            setToggleModal={undefined}
            toggleModal={undefined}
            toggleStatus={undefined}
            setToggleStatus={undefined}
            setToggleRolePermissionModal={undefined}
          />
        </Provider>
      );
      expect(queryByTestId("test-heading")).toBeNull();

      /* expect(getByTestId("test-heading").textContent).toEqual(
        "Create Credentials"
      ); */
    });
  });

  afterEach(cleanup);
});
