import React from "react";
import { render, act } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "app/store";
import { MemoryRouter, Route } from "react-router-dom";
import TransactionalLogsFilter from "./TransactionalLogsFilter";

// Mock the API module
jest.mock("services/api/transactionalLog.api");

// Common Variables to pass to test components
const transactionlogData = {};

describe("TransactionalLogsFinal Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("check select all functionality", async () => {
    // Mock the API call

    let tree: any;
    await act(async () => {
      tree = render(
        <MemoryRouter initialEntries={["/"]}>
          <Provider store={store}>
            <TransactionalLogsFilter
              transactionalData={transactionlogData}
              resentCount
              setRefresh={jest.fn}
              refresh
              toggleSelectAll={jest.fn}
              setSelectAll={jest.fn}
              selectAll={jest.fn}
              onChangePageOrder={jest.fn}
              columnHeaders={["dsds", "dsdsd"]}
              generateCustomizeTableContent={jest.fn}
              toggleCustContentPopover={jest.fn}
              reset={false}
              setReset={jest.fn}
              entityNameArr={["dsds", "dsdsd"]}
              sourceArr={["dsds", "dsdsd"]}
              statusArr={["dsds", "dsdsd"]}
            />
          </Provider>
        </MemoryRouter>
      );
    });
  });
});
