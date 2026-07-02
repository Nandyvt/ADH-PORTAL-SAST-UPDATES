import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PaginationSettings from "./index";

describe("PaginationSettings", () => {
  test("renders correctly", () => {
    const setPageSizeMock = jest.fn();
    const setPageNumberMock = jest.fn();
    const { getByText } = render(
      <PaginationSettings
        totalCounts={100}
        pageSize={20}
        setPageSize={setPageSizeMock}
        setPageNumber={setPageNumberMock}
      />
    );

    const showText = screen.getByText(/show/i);
    const itemsText = screen.getByText(/items of 100/i);
    expect(showText).toBeInTheDocument();
    expect(itemsText).toBeInTheDocument();
    const pageSizeOption = getByText("50");
    fireEvent.click(pageSizeOption);
    expect(setPageSizeMock).toHaveBeenCalledWith(50);
    fireEvent.keyUp(pageSizeOption, { keyCode: 32 });
    expect(setPageSizeMock).toHaveBeenCalledWith(50);
  });
});
