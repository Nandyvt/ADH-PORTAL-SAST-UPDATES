import React from "react";
import store from "app/store";
import { Provider } from "react-redux";

import { render, cleanup, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Location from "./Location";

// Mock adhLogin and logger
jest.mock("common/utils/logger.utils", () => ({
  logger: jest.fn(),
}));
jest.mock("app/hooks/auth/authManager", () => ({
  adhLogin: jest.fn(),
}));
// mock constant window
jest.mock("common/constants", () => ({
  WINDOW: {
    userManager: {
      events: {
        addUserLoaded: jest.fn(),
        addUserUnloaded: jest.fn(),
      },
    },
  },
}));

describe("Location Component", () => {
  it("Check if UI elements available after componet loads", async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <Location />
        </Provider>
      </MemoryRouter>
    );

    await act(() => {
      expect(getByTestId("test-loadingtitle")).toBeInTheDocument();

      expect(getByTestId("test-loadingtitle").textContent).toEqual(
        "Welcome to ADH"
      );
    });
  });
  it("handles authState change", async () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useHistory: () => ({ push: jest.fn() }),
    }));

    // Render the component
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <Location />
        </Provider>
      </MemoryRouter>
    );

    await act(() => {
      // Simulate a change in authState
      store.dispatch({
        type: "SET_AUTH_STATE",
        payload: { ahaSsoAccessToken: "mockAccessToken" },
      });
    });
  });

  afterEach(cleanup);
});
