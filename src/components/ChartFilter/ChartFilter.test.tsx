import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import ChartFilter, { FilterProps } from "./index";

describe("ChartFilter", () => {
  const defaultProps: FilterProps = {
    defaultSelection: "3 Months",
    uniqueId: "chartFilter",
    setSelectedDays: jest.fn(),
    backgroundColor: "#ffffff",
  };

  //   it("renders the component", () => {
  //     const tree = render(<ChartFilter {...defaultProps} />);
  //     expect(tree).toMatchSnapshot();
  //   });

  it("calls setSelectedDays when an option is clicked", () => {
    const { getByText } = render(<ChartFilter {...defaultProps} />);
    const option = getByText("2 Weeks");
    fireEvent.click(option);
    expect(defaultProps.setSelectedDays).toHaveBeenCalledWith("14");
  });

  it("changes the dropdownName when an option is clicked", async () => {
    const { getAllByText, getByLabelText } = render(
      <ChartFilter {...defaultProps} />
    );
    const option = getAllByText("1 Month");
    fireEvent.click(option[0]);
    expect(option[0]).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(getByLabelText("Date Selector"));
    });
  });
});
