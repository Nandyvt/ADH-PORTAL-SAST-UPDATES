import React from "react";
import { act, render } from "@testing-library/react";
import store from "app/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import SearchInputField from ".";

describe("ShowNumberOfRecords", () => {
  it("should render the correct number of records", async () => {
    const { getAllByLabelText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <SearchInputField reset={false} />
        </Provider>
      </MemoryRouter>
    );

    await act(async () => {
      const searchInput = getAllByLabelText("Search By");
      expect(searchInput[0]).toBeInTheDocument();
    });
  });
});
