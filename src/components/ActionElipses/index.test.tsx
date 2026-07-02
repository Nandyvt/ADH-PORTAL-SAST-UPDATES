import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // for the "toBeInTheDocument" matcher

import ActionElipses from "./index";

describe("ActionElipses", () => {
  it("renders without errors", () => {
    const mockActions = [
      { name: "Action 1", onClickCalBackFun: jest.fn() },
      { name: "Action 2", onClickCalBackFun: jest.fn() },
      // Add more mock actions as needed
    ];

    const { getByText, getByLabelText } = render(
      <ActionElipses elipsesActions={mockActions} />
    );

    // Check if the ellipsis button is rendered
    const ellipsisButton = getByLabelText("View more");
    expect(ellipsisButton).toBeInTheDocument();

    // Check if tooltip is rendered
    const tooltipText = getByText("View More");
    expect(tooltipText).toBeInTheDocument();
  });

  it("toggles popover and classes on button click", () => {
    const mockActions = [
      { name: "Action 1", onClickCalBackFun: jest.fn() },
      { name: "Action 2", onClickCalBackFun: jest.fn() },
    ];

    const { getByLabelText, getByText } = render(
      <ActionElipses elipsesActions={mockActions} />
    );

    // Simulate button click
    const ellipsisButton = getByLabelText("View more");
    fireEvent.click(ellipsisButton);

    // Check if classes are toggled correctly
    expect(ellipsisButton).toHaveClass("rotate-90");

    // Check if popover is displayed
    const popover = getByText("Action 1");
    expect(popover).toBeInTheDocument();
  });

  it("calls onClickCalBackFun when action button is clicked", () => {
    const mockActions = [
      { name: "Action 1", onClickCalBackFun: jest.fn() },
      { name: "Action 2", onClickCalBackFun: jest.fn() },
    ];

    const { getByText } = render(
      <ActionElipses elipsesActions={mockActions} />
    );

    // Simulate button click
    const actionButton = getByText("Action 1");
    fireEvent.click(actionButton);

    // Check if the onClickCalBackFun function is called
    expect(mockActions[0].onClickCalBackFun).toHaveBeenCalled();
  });
});
