import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // For additional matchers like toBeInTheDocument
import EmailDetails from "./index";

// Mock dependencies
jest.mock("app/store", () => ({ dispatch: jest.fn() }));
jest.mock("common/utils", () => ({
  getErrorMessage: jest.fn(),
  getMainIcon: jest.fn(),
  capitalizeFirstLetter: jest.fn(),
}));
jest.mock("components/Modal", () => () => <div data-testid="modal" />);
jest.mock("components/Toast/toast.slice", () => ({ showToast: jest.fn() }));
jest.mock("pages/Notifications/utils", () => ({
  getMessage: jest.fn(),
  getStatusAction: jest.fn(),
  updateModalContent: jest.fn(),
}));

jest.mock("services/api/notification.api", () => ({
  deleteEmailConfigService: jest.fn().mockResolvedValue("Success"), // Mock the response
}));

const emailClientConfig = [
  {
    serviceProviderName: "Test Provider",
    config: {
      domain: "test.com",
      privateKey: "testkey",
    },
    id: 1,
  },
];
const apiStatus = "deleteApi";
const setApiStatus = jest.fn();

describe("EmailDetails", () => {
  it("renders with the correct details", async () => {
    const { getByText, getByTestId } = render(
      <EmailDetails
        emailClientConfig={emailClientConfig}
        apiStatus={apiStatus}
        setApiStatus={setApiStatus}
      />
    );

    await waitFor(() => {
      expect(getByText("Service Provider")).toBeInTheDocument();
      expect(getByText("test.com")).toBeInTheDocument();
      expect(getByText("testkey")).toBeInTheDocument();
    });
  });

  it("calls setApiStatus on delete button click", async () => {
    const { getByText } = render(
      <EmailDetails
        emailClientConfig={emailClientConfig}
        apiStatus={apiStatus}
        setApiStatus={setApiStatus}
      />
    );

    fireEvent.click(getByText("Delete"));
    await waitFor(() => {
      expect(setApiStatus).toHaveBeenCalledWith("deleteApi");
    });
  });
  it("calls ApiCaller on edit button click", async () => {
    const { getByText, getByTestId } = render(
      <EmailDetails
        emailClientConfig={emailClientConfig}
        apiStatus={apiStatus}
        setApiStatus={setApiStatus}
      />
    );

    fireEvent.click(getByText("Edit"));
  });
});
