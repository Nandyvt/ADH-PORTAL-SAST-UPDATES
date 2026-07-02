import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import Pagination, { generatePaginationRange } from "./index";

describe("Pagination component", () => {
  const setPageNumberMock = jest.fn();
  const paginationProps = {
    pageNumber: 1,
    pageSize: 10,
    totalCount: 100,
    totalPages: 10,
    isFirst: 0,
    isLast: 0,
    setPageNumber: setPageNumberMock,
    paginationSetLimit: 11,
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  /* test(" snapshot renders correctly", () => {
    const { container } = render(
      <Pagination
        pageNumber={1}
        isFirst={1}
        isLast={0}
        setPageNumber={setPageNumberMock}
        paginationSetLimit={5}
      />
    );
    expect(container).toMatchSnapshot();
  }); */

  it("should render with correct props", () => {
    const { getByLabelText } = render(<Pagination {...paginationProps} />);
    expect(getByLabelText("Previous")).toBeInTheDocument();
    expect(getByLabelText("Next")).toBeInTheDocument();
  });

  it("should call setPageNumber with previous page number when previous button is clicked", () => {
    const { getByLabelText } = render(<Pagination {...paginationProps} />);
    const previousButton = getByLabelText("Previous");
    fireEvent.click(previousButton);
    expect(setPageNumberMock).toHaveBeenCalledWith(
      paginationProps.pageNumber - 1
    );
  });

  it("should call setPageNumber with next page number when next button is clicked", () => {
    const { getByLabelText } = render(<Pagination {...paginationProps} />);
    const nextButton = getByLabelText("Next");
    fireEvent.click(nextButton);
    expect(setPageNumberMock).toHaveBeenCalledWith(
      paginationProps.pageNumber + 1
    );
  });

  it("should disable previous button when isFirst is 1", () => {
    const { getByLabelText } = render(
      <Pagination {...paginationProps} isFirst={1} />
    );
    const previousButton = getByLabelText("Previous");
    expect(previousButton).toBeDisabled();
  });

  it("should disable next button when isLast is 1", () => {
    const { getByLabelText } = render(
      <Pagination {...paginationProps} isLast={1} />
    );
    const nextButton = getByLabelText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("should show correct page numbers in pagination", () => {
    const { getAllByRole } = render(<Pagination {...paginationProps} />);
    const pageButtons = getAllByRole("button", { name: /Page/i });
    expect(pageButtons.length).toBe(paginationProps.totalPages);
    for (let i = 0; i < pageButtons.length; i += 1) {
      expect(pageButtons[i].textContent).toBe(`${i + 1}`);
    }
  });

  it("should generate the correct pagination range", () => {
    const expectedRange = [
      "1 - 10",
      "11 - 20",
      "21 - 30",
      "31 - 40",
      "41 - 50",
      "51 - 60",
      "61 - 70",
      "71 - 80",
      "81 - 90",
      "91 - 100",
    ];
    const result = generatePaginationRange(paginationProps);
    expect(result).toEqual(expectedRange);
  });

  it("returns the correct values when totalPages is less than paginationSetLimit", () => {
    const paginationProp = {
      pageNumber: 9,
      pageSize: 9,
      totalCount: 100,
      totalPages: 10,
      isFirst: 0,
      isLast: 1,
      setPageNumber: setPageNumberMock,
      paginationSetLimit: 5,
    };
    const { getByLabelText } = render(<Pagination {...paginationProp} />);
    expect(getByLabelText("current page 9")).toBeInTheDocument();
  });
  it("returns the expected range array when total count is not divisible by page size", () => {
    const PaginationComp = {
      pageNumber: 1,
      pageSize: 20,
      totalCount: 31,
      totalPages: 2,
    };
    const expectedRange = ["1 - 20", "21 - 31"];
    expect(generatePaginationRange(PaginationComp)).toEqual(expectedRange);
  });
});
