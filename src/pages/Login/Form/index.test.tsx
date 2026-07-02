import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { ahaSsoLogin } from "app/hooks/auth/authManager";
import configureMockStore from "redux-mock-store";
import LoginForm from "./index";
// Mock the authManager and toast functions
jest.mock("app/hooks/auth/authManager", () => ({
  ahaSsoLogin: jest.fn(),
}));
jest.mock("components/Toast/toast.slice", () => ({
  showToast: jest.fn(),
}));

describe("LoginForm Component", () => {
  const mockStore = configureMockStore();
  let store: any;

  it("renders without errors", () => {
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
    const { getByText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const signInButton = getByText("Sign In");
    expect(signInButton).toBeInTheDocument();
  });

  it("handles loginHandler function", () => {
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
    const { getByText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const signInButton = getByText("Sign In");
    fireEvent.click(signInButton);

    expect(ahaSsoLogin).toHaveBeenCalled();
  });
});
