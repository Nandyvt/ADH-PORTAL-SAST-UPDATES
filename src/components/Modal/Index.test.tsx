import React from "react";
import store from "app/store";
import { Provider } from "react-redux";

// @ts-ignore

import { render, cleanup, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Modal from "./index";

const isShown = true;
const toggle = (isShow: boolean) => !isShow;
const ApiCaller = (id: number, status: string) => {};
describe("Modal Component", () => {
  it("Check if UI elements available after componet loads", () => {
    const routePath = "/";

    const { getByTestId, container } = render(
      <MemoryRouter initialEntries={[routePath]}>
        <Provider store={store}>
          <Modal
            status="ACTIVE"
            isShown
            id={3}
            action={ApiCaller}
            modalContent="This is modal content"
            hide={() => toggle(isShown)}
            roles={[]}
            mainIcon=""
          />
        </Provider>
      </MemoryRouter>
    );

    const NoBtn = getByTestId("no-button");
    fireEvent.click(NoBtn);

    const YesBtn = getByTestId("yes-button");
    fireEvent.click(YesBtn);

    expect(getByTestId("no-button")).toBeInTheDocument();
    expect(getByTestId("yes-button")).toBeInTheDocument();

    expect(getByTestId("modal-content").textContent).toEqual(
      "This is modal content"
    );
  });

  afterEach(cleanup);
});
