// Import the functions to be tested
import {
  keydownToggleNoOfRecordTableFilter,
  toggleNoOfRecordTableFilter,
} from "./utils";

// Mock an event object
const mockEvent = {
  keyCode: 13, // This can be any keyCode you want to test
  stopPropagation: jest.fn(),
  preventDefault: jest.fn(),
  currentTarget: {
    classList: {
      toggle: jest.fn(),
      contains: jest.fn(() => false), // Assuming initially it does not contain the class
    },
    nextSibling: {
      classList: {
        toggle: jest.fn(),
        contains: jest.fn(() => true), // Assuming initially it contains the class
      },
    },
    setAttribute: jest.fn(),
  },
};

describe("keydownToggleNoOfRecordTableFilter", () => {
  it("should call the necessary methods on key press", () => {
    keydownToggleNoOfRecordTableFilter(mockEvent);

    // Expect that the methods have been called
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(
      mockEvent.currentTarget.nextSibling.classList.toggle
    ).toHaveBeenCalledWith("visible_cls");
    expect(mockEvent.currentTarget.setAttribute).toHaveBeenCalledWith(
      "aria-expanded",
      "false"
    );
  });
});

describe("toggleNoOfRecordTableFilter", () => {
  it("should call the necessary methods", () => {
    toggleNoOfRecordTableFilter(mockEvent);

    // Expect that the methods have been called
    expect(
      mockEvent.currentTarget.nextSibling.classList.toggle
    ).toHaveBeenCalledWith("visible_cls");
  });
});
