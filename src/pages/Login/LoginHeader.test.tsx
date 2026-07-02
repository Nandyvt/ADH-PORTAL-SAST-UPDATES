import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginHeader from "./LoginHeader";

describe("LoginHeader Component", () => {
  it("renders without errors", () => {
    render(<LoginHeader />);
  });

  it("handles scroll event correctly", () => {
    const { container } = render(<LoginHeader />);
    const headerElement = container.querySelector(".header-fixed");

    // Simulate a scroll event
    fireEvent.scroll(window, { target: { scrollY: 100 } });

    // Check if the header element has the expected class after scrolling
    expect(headerElement).toHaveClass("top-103");
  });
});
