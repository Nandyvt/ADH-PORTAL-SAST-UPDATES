import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import EmailConfigure from "./index";

describe("EmailConfigure Component", () => {
  // Test case for post mode
  it("renders post mode form", () => {
    const mockProps = {
      setTabViewState: jest.fn(),
      tabView: {},
      apiStatus: "post",
      setApiStatus: jest.fn(),
      GetClientConfigEmail: jest.fn(),
      emailClientConfig: [],
      setLoading: jest.fn(),
    };

    const { getByLabelText, getByText } = render(
      <EmailConfigure {...mockProps} />
    );

    // Test that the form elements are rendered
    expect(getByLabelText("Service Provider")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Save")).toBeInTheDocument();
  });

  // Test case for edit mode
  it("renders edit mode form", () => {
    const mockProps = {
      setTabViewState: jest.fn(),
      tabView: {},
      apiStatus: "edit",
      setApiStatus: jest.fn(),
      GetClientConfigEmail: jest.fn(),
      emailClientConfig: [
        {
          id: 1,
          serviceProviderId: 1,
          config: {
            provider: "Provider 1",
            domain: "example.com",
            privateKey: "12345",
          },
        },
      ],
      setLoading: jest.fn(),
    };

    const { getByLabelText, getByText } = render(
      <EmailConfigure {...mockProps} />
    );

    // Test that the form elements are rendered
    expect(getByLabelText("Service Provider")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Save")).toBeInTheDocument();
  });
  it("submits post mode form", async () => {
    const mockProps = {
      setTabViewState: jest.fn(),
      tabView: {},
      apiStatus: "post",
      setApiStatus: jest.fn(),
      GetClientConfigEmail: jest.fn(),
      emailClientConfig: [],
      setLoading: jest.fn(),
    };

    const { getByLabelText, getByText } = render(
      <EmailConfigure {...mockProps} />
    );

    // Fill out the form fields
    fireEvent.change(getByLabelText("Service Provider"), {
      target: { value: "Provider 1" },
    });

    // Submit the form
    fireEvent.click(getByText("Save"));
  });
});
