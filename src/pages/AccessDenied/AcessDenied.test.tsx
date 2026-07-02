import React from "react";
import { act, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../../app/store";
import AccessDenied from "./index";

describe("AccessDenied component", () => {
  /* test("Acesss Denied snapshot renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <AccessDenied />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  }); */
  test("renders image with correct alt text and src", async () => {
    const { getByAltText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <AccessDenied />
        </Provider>
      </MemoryRouter>
    );

    await act(() => {
      const img = getByAltText("AccessDenied");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "/images/Mail.svg");
    });
  });
  it("renders the error message correctly", async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <AccessDenied />
        </Provider>
      </MemoryRouter>
    );

    await act(() => {
      const loadingTitle = getByTestId("test-loadingtitle");
      expect(loadingTitle).toBeInTheDocument();
      expect(loadingTitle).toHaveTextContent(
        "Sorry, we couldn’t find logged in user with active roles,Please contact your Administrator"
      );
    });
  });
});
