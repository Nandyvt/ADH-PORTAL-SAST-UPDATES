import React from "react";
import { Provider } from "react-redux";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useParams } from "react-router-dom";

import store from "app/store";
import * as id from "services/api/transactionalLog.api";
import TransactionalLogDetail from "./TransactionalLogDetail";

// 1) Mock react-router-dom once at the top
jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    // We'll override this in each test
    useParams: jest.fn(),
  };
});

describe("Transactional Log Component", () => {
  const transactionMock = {
    /* ... data ... */
  };

  afterEach(() => {
    // Reset mocks between tests
    jest.resetAllMocks();
  });

  it("calls the API for a valid route", async () => {
    // 2) Make sure useParams returns both id and type
    (useParams as jest.Mock).mockReturnValue({ id: "1", type: "request" });

    // 3) Spy on the API and mock its return
    jest.spyOn(id, "TransactionalLogDetails").mockResolvedValue({
      status: 200,
      data: { transactionLog: transactionMock },
    });

    // 4) Render with a route that matches what your component expects
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/transactionLogs/1/request"]}>
          <Routes>
            <Route
              path="/transactionLogs/:id/:type"
              element={<TransactionalLogDetail />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // 5) Wait for the effect to run
    await waitFor(() => {
      expect(id.TransactionalLogDetails).toHaveBeenCalled();
    });
  });

  it("does not call API if type is invalid", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1", type: "breaktest" });

    // Spy so we can check calls
    const spy = jest.spyOn(id, "TransactionalLogDetails");

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/transactionLogs/1/breaktest"]}>
          <Routes>
            <Route
              path="/transactionLogs/:id/:type"
              element={<TransactionalLogDetail />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
