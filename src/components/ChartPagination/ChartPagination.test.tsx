import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ChartPagination from "./index";

describe("ChartPagination", () => {
  const apiCallerMock = jest.fn();
  const updateChartMock = jest.fn();

  beforeEach(() => {
    apiCallerMock.mockClear();
    updateChartMock.mockClear();
  });

  it("should render the pagination component", async () => {
    const responseMock = {
      _pagination: {
        pageNumber: 2,
        totalCount: 10,
        pageOffset: 6,
        pageSize: 6,
        totalPages: 2,
        isFirst: 0,
        isLast: 0,
      },
    };

    apiCallerMock.mockResolvedValue(responseMock);

    render(
      <ChartPagination
        apiCaller={apiCallerMock}
        updateChart={updateChartMock}
      />
    );

    // Assert that the pagination component is rendered
    expect(screen.getByTestId("paginationNumberSec")).toBeInTheDocument();
    expect(screen.getByTestId("paginationPrevBtn")).toBeInTheDocument();
    expect(screen.getByTestId("paginationNextBtn")).toBeInTheDocument();
  });

  it("should call the apiCaller with correct arguments when previous button is clicked", async () => {
    const responseMock = {
      _pagination: {
        pageNumber: 2,
        totalCount: 10,
        pageOffset: 6,
        pageSize: 6,
        totalPages: 2,
        isFirst: 0,
        isLast: 0,
      },
    };

    apiCallerMock.mockResolvedValue(responseMock);

    render(
      <ChartPagination
        apiCaller={apiCallerMock}
        updateChart={updateChartMock}
      />
    );

    const prevButton = screen.getByTestId("paginationPrevBtn");
    fireEvent.click(prevButton);

    // Assert that the apiCaller is called with the correct arguments
    expect(apiCallerMock).toHaveBeenCalledWith(1, 6);
  });

  it("should call the apiCaller with correct arguments when next button is clicked", async () => {
    const responseMock = {
      _pagination: {
        pageNumber: 2,
        totalCount: 10,
        pageOffset: 6,
        pageSize: 6,
        totalPages: 2,
        isFirst: 0,
        isLast: 1,
      },
    };

    apiCallerMock.mockResolvedValue(responseMock);

    render(
      <ChartPagination
        apiCaller={apiCallerMock}
        updateChart={updateChartMock}
      />
    );

    const nextButton = screen.getByTestId("paginationNextBtn");
    fireEvent.click(nextButton);

    // Assert that the apiCaller is called with the correct arguments
    expect(apiCallerMock).toHaveBeenCalledWith(2, 6);
  });
});
