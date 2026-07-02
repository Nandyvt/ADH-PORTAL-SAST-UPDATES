import React from "react";
import { render } from "@testing-library/react";
import { useSelector, DefaultRootState } from "react-redux";
import { Loader } from "./index";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("Loader Component", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: DefaultRootState) => any) =>
        selector({
          loader: {
            isPageLoading: true, // Initial loader state
          },
        })
    );
  });

  afterEach(() => {
    (useSelector as jest.Mock).mockClear();
  });

  test("Loader renders when isPageLoading is true", () => {
    const { container } = render(<Loader />);
    expect(container.querySelector(".aui-loader")).toBeInTheDocument();
  });

  test("Loader does not render when isPageLoading is false", () => {
    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: DefaultRootState) => any) =>
        selector({
          loader: {
            isPageLoading: false, // Updated loader state
          },
        })
    );

    const { container } = render(<Loader />);
    expect(container.querySelector(".aui-loader")).toBeNull();
  });

  test("Loader updates when Redux state changes", () => {
    const { container, rerender } = render(<Loader />);

    expect(container.querySelector(".aui-loader")).toBeInTheDocument();

    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: DefaultRootState) => any) =>
        selector({
          loader: {
            isPageLoading: false, // Updated loader state
          },
        })
    );

    rerender(<Loader />);
    expect(container.querySelector(".aui-loader")).toBeNull();
  });
});
