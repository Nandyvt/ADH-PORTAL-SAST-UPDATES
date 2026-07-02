import React from "react";
import { render } from "@testing-library/react";
import DefaultLayout from "./index";

describe("DefaultLayout Component", () => {
  it("renders children", () => {
    const { getByText } = render(
      <DefaultLayout>
        <div>Child Component</div>
      </DefaultLayout>
    );

    expect(getByText("Child Component")).toBeInTheDocument();
  });

  it("updates document title based on route", () => {
    // Mocking window.location.pathname
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/example-route",
      },
    });

    render(
      <DefaultLayout>
        <div>Child Component</div>
      </DefaultLayout>
    );

    expect(document.title).toBe(
      "American Heart Association | Data Hub - Login Page"
    );
  });

  it("adds class to body for root route", () => {
    // Mocking window.location.pathname
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/",
      },
    });

    render(
      <DefaultLayout>
        <div>Child Component</div>
      </DefaultLayout>
    );

    expect(document.body.classList.contains("loginPageStickySec")).toBe(true);
  });
});
