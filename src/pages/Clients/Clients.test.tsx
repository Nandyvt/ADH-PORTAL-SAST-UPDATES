import React from "react";
import store from "app/store";
import { Provider } from "react-redux";
import { render, cleanup, act, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Add this
import * as api from "services/api/clients.api";
import ClientListComp from "./Clients";

// Mock the module with proper typing
jest.mock("services/api/clients.api", () => ({
  ClientListService: jest.fn(),
}));

// Cast the mock to the correct type
const mockedClientListService = api.ClientListService as jest.Mock;

describe("Clients Component", () => {
  it("Check if UI elements available after component loads", async () => {
    mockedClientListService.mockResolvedValue({
      data: {
        clients: [
          {
            id: 122,
            name: "adsaNew Client123",
            code: "adsaNewClient123",
            address: null,
            description: "",
            isActive: 1,
            createdAt: "2023-04-02T15:30:48Z",
            updatedAt: "2023-04-02T15:30:48Z",
          },
          {
            id: 117,
            name: "New Client",
            code: "NewClient",
            address: null,
            description: "",
            isActive: 1,
            createdAt: "2023-04-02T15:18:39Z",
            updatedAt: "2023-04-02T15:18:39Z",
          },
        ],
        _pagination: {
          pageNumber: 1,
          pageOffset: 1,
          pageSize: 20,
          totalCount: 43,
          totalPages: 3,
          isFirst: 1,
          isLast: 0,
        },
        requestId: "a5c6ab4be1c3c704e9ce815d1eaab0bd",
      },
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            {" "}
            {/* Wrap with MemoryRouter */}
            <ClientListComp />
          </MemoryRouter>
        </Provider>
      );
    });

    // Use screen.findByTestId to wait for the element
    const clientHeader = await screen.findByTestId("test-client");
    expect(clientHeader).toBeInTheDocument();
    expect(clientHeader.textContent).toEqual("Clients");
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks(); // Reset all mocks
  });
});
