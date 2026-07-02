import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Login from "./index";

describe("Login Component", () => {
  const mockStore = configureMockStore();
  let store: any;
  it("renders the login page", () => {
    const initialState = {
      user: {
        expiryPath: "",
      },
      authed: {
        ahaSsoAccessToken: "test",
      },
      header: {
        headerTitle: "test",
      },
      toast: {
        message: "test",
        type: "success",
        visibility: true,
        title: "test",
      },
    };
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const heading = screen.getByText("Welcome to ADH");
    expect(heading).toBeInTheDocument();
  });
});
