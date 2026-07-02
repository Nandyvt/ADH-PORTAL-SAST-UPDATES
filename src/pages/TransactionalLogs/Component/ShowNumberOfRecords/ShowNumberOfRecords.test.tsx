import React from "react";
import { act, render } from "@testing-library/react";
import store from "app/store";
import { Provider } from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import ShowNumberOfRecords from ".";

describe("ShowNumberOfRecords", () => {
  // it("should render the correct number of records", async () => {
  //   let tree;
  //   await act(async () => {
  //     tree = render(
  //       <MemoryRouter initialEntries={["/transactionLogs"]}>
  //         <Route path="/transactionLogs">
  //           <Provider store={store}>
  //             <ShowNumberOfRecords />
  //           </Provider>
  //         </Route>
  //       </MemoryRouter>
  //     );
  //   });

  //   expect(tree).toMatchSnapshot();
  // });

  it("should render the correct number of records", async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <ShowNumberOfRecords isCursorPagination />
        </Provider>
      </MemoryRouter>
    );
    await act(() => {
      const renderedText = getByText("Items per page");

      expect(renderedText).toBeInTheDocument();
    });
  });
});
