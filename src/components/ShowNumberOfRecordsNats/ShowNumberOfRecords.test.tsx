import React from "react";
import { act, render, screen } from "@testing-library/react";
import store from "app/store";
import { Provider } from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import ShowNumberOfRecordsNatsComp from ".";

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
    const onChangefunc = jest.fn();
    const routePath = "/transactionLogs";

    const { container, debug } = render(
      <MemoryRouter initialEntries={[routePath]}>
        <ShowNumberOfRecordsNatsComp
          totalCount={100}
          onChangeFunc={onChangefunc}
        />
      </MemoryRouter>
    );

    expect(container).toHaveTextContent(/items of.*100/);
  });
});
