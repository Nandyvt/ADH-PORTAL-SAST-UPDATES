import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Dropdown from "./index";

describe("Dropdown component", () => {
  const items = [
    { value: 1, label: "Option 1" },
    { value: 2, label: "Option 2" },
    { value: 3, label: "Option 3" },
  ];
  const selectedValue = 2;
  const callParentOnSelect = jest.fn();
  const id = "dropdown";
  const disabled = false;
  const isLoading = false;
  const approveRejectInd = false;

  //   it("renders the component correctly", () => {
  //     const tree = render(
  //       <Dropdown
  //         items={items}
  //         selectedValue={selectedValue}
  //         callParentOnSelect={callParentOnSelect}
  //         id={id}
  //         disabled={disabled}
  //         isLoading={isLoading}
  //         approveRejectInd={approveRejectInd}
  //       />
  //     );
  //     expect(tree).toMatchSnapshot();
  //   });

  it("displays the selected item name", () => {
    const { getByDisplayValue } = render(
      <Dropdown
        items={items}
        selectedValue={selectedValue}
        callParentOnSelect={callParentOnSelect}
        id={id}
        disabled={disabled}
        isLoading={isLoading}
        approveRejectInd={approveRejectInd}
      />
    );

    const selectedItem = getByDisplayValue("Option 2");
    expect(selectedItem).toBeInTheDocument();
  });

  it("calls the parent onSelect function when an option is selected", async () => {
    const { getByText } = render(
      <Dropdown
        items={items}
        selectedValue={selectedValue}
        callParentOnSelect={callParentOnSelect}
        id={id}
        disabled={disabled}
        isLoading={isLoading}
        approveRejectInd={approveRejectInd}
      />
    );

    const option = getByText("Option 3");
    fireEvent.click(option);

    expect(callParentOnSelect).toHaveBeenCalledWith(3);
  });
});
