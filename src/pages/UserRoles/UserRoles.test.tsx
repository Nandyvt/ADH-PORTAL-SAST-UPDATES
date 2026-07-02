import React from "react";
import store from "app/store";
import { Provider } from "react-redux";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Updated import
import UserRolesComp from "./UserRoles";

describe("AddClients Component", () => {
  const props = {
    id: 9897,
    role: "Admin",
    rolePermissions: [],
    tenantName: "NA",
    clientName: "NA",
  };

  it("Check if UI elements available after component loads", async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <UserRolesComp {...props} />
        </Provider>
      </MemoryRouter>
    );

    await act(() => {
      expect(getByTestId("roleNextBtn")).toBeInTheDocument();
    });
  });

  it("Role Selection button is disabled on initial Page Load", async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Provider store={store}>
          <UserRolesComp {...props} />
        </Provider>
      </MemoryRouter>
    );

    await act(() => {
      const roleNxtBtn = getByTestId("roleNextBtn");
      fireEvent.click(roleNxtBtn);
      expect(roleNxtBtn).toBeDisabled();
    });
  });

  afterEach(cleanup);
});
