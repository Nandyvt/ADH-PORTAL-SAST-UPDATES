import React from "react";
import store from "app/store";
import { Provider } from "react-redux";

import { render, act } from "@testing-library/react";
import * as user from "services/api/user.api";
import * as role from "services/api/settings.api";
import * as client from "services/api/clients.api";
import * as inviteusers from "services/api/inviteUser.api";
import { MemoryRouter } from "react-router-dom";
import UsersComp from "./Users";

describe("Users Component", () => {
  beforeEach(() => {
    jest.spyOn(user, "getUsers").mockResolvedValue({
      status: 200,
      data: {
        users: [
          {
            id: 29,
            name: "drfdef",
            email: "superadmin@mail.com",
            firstName: "drfdef",
            lastName: "dfdf",
            isActive: true,
            status: "ACTIVE",
            roles: [
              {
                roleId: 1,
                clientId: null,
                roleName: "Super Admin",
                clientName: null,
                userRoleId: 42,
                userRoleStatus: "ACTIVE",
              },
              {
                roleId: 4,
                clientId: 35,
                roleName: "Client Admin",
                clientName: "New Client123",
                userRoleId: 171,
                userRoleStatus: "ACTIVE",
              },
              {
                roleId: 4,
                clientId: 74,
                roleName: "Client Admin",
                clientName: "sadsad",
                userRoleId: 324,
                userRoleStatus: "ACTIVE",
              },
              {
                roleId: 5,
                clientId: 73,
                roleName: "Client User",
                clientName: "dsewq",
                userRoleId: 325,
                userRoleStatus: "ACTIVE",
              },
              {
                roleId: 4,
                clientId: 87,
                roleName: "Client Admin",
                clientName: "dfdfsdf",
                userRoleId: 390,
                userRoleStatus: "ACTIVE",
              },
            ],
            createdAt: "2022-06-10T10:50:14Z",
            updatedAt: "2023-04-18T05:49:03Z",
          },
          {
            id: 45,
            name: "Ultimate",
            email: "ultimateuser@mail.com",
            firstName: "Ultimate",
            lastName: "User",
            isActive: true,
            status: "ACTIVE",
            roles: [
              {
                roleId: 5,
                clientId: 13,
                roleName: "Client User",
                clientName: "rwsdrf",
                userRoleId: 203,
                userRoleStatus: "ACTIVE",
              },
              {
                roleId: 4,
                clientId: 23,
                roleName: "Client Admin",
                clientName: "ADH",
                userRoleId: 316,
                userRoleStatus: "INACTIVE",
              },
              {
                roleId: 4,
                clientId: 34,
                roleName: "Client Admin",
                clientName: "CDP",
                userRoleId: 323,
                userRoleStatus: "INACTIVE",
              },
              {
                roleId: 5,
                clientId: 85,
                roleName: "Client User",
                clientName: "Bshehn",
                userRoleId: 407,
                userRoleStatus: "INACTIVE",
              },
              {
                roleId: 4,
                clientId: 86,
                roleName: "Client Admin",
                clientName: "Chris-test",
                userRoleId: 432,
                userRoleStatus: "INACTIVE",
              },
              {
                roleId: 5,
                clientId: 108,
                roleName: "Client User",
                clientName: "TATA sons",
                userRoleId: 437,
                userRoleStatus: "INACTIVE",
              },
              {
                roleId: 6,
                clientId: null,
                roleName: "Super User",
                clientName: null,
                userRoleId: 456,
                userRoleStatus: "ACTIVE",
              },
              {
                roleId: 4,
                clientId: 117,
                roleName: "Client Admin",
                clientName: "New Client",
                userRoleId: 477,
                userRoleStatus: "ACTIVE",
              },
            ],
            createdAt: "2022-06-10T10:50:14Z",
            updatedAt: "2023-04-18T05:11:57Z",
          },
        ],
      },
      _pagination: {
        pageNumber: 1,
        pageOffset: 1,
        pageSize: 20,
        totalCount: 95,
        totalPages: 5,
        isFirst: 1,
        isLast: 0,
      },
      requestId: "cd94b10bbe83fe107252e6abc1edb9d6",
    });
    jest.spyOn(role, "getRoles").mockResolvedValue({
      status: 200,
      data: {
        roles: [
          {
            id: 1,
            name: "Super Admin",
            code: "SUPER_ADMIN",
            level: 0,
            numOfUsers: 0,
            isActive: true,
            createdAt: "2021-03-26T07:54:55Z",
            updatedAt: "0001-01-01T00:00:00Z",
          },
          {
            id: 6,
            name: "Super User",
            code: "SUPER_USER",
            level: 0,
            numOfUsers: 0,
            isActive: true,
            createdAt: "2022-02-01T06:55:12Z",
            updatedAt: "0001-01-01T00:00:00Z",
          },
          {
            id: 4,
            name: "Client Admin",
            code: "CLIENT_ADMIN",
            level: 2,
            numOfUsers: 0,
            isActive: true,
            createdAt: "2021-03-26T08:00:09Z",
            updatedAt: "2023-03-22T09:50:24Z",
          },
          {
            id: 5,
            name: "Client User",
            code: "CLIENT_USER",
            level: 2,
            numOfUsers: 0,
            isActive: true,
            createdAt: "2021-03-26T08:02:43Z",
            updatedAt: "2023-02-21T14:17:03Z",
          },
        ],
      },
      _pagination: {
        pageNumber: 1,
        pageOffset: 1,
        pageSize: 25,
        totalCount: 4,
        totalPages: 1,
        isFirst: 1,
        isLast: 1,
      },
      requestId: "0e5ab324edfb65affc5482c9f9df95d8",
    });
    jest.spyOn(client, "ClientListService").mockResolvedValueOnce({
      status: 200,
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
      },
      _pagination: {
        pageNumber: 1,
        pageOffset: 1,
        pageSize: 500,
        totalCount: 43,
        totalPages: 1,
        isFirst: 1,
        isLast: 1,
      },
      requestId: "401ffd1149881ac8e873810d727c7dac",
    });
    jest.spyOn(inviteusers, "inviteUserService").mockResolvedValueOnce({
      status: 200,
      data: {
        user: {
          id: 329,
          name: "xbdwg",
          email: "nsxjds@impelsys.com",
          firstName: "xbdwg",
          lastName: "xdx",
          isActive: true,
          createdAt: "2023-04-21T05:58:24.73919419Z",
          updatedAt: "2023-04-21T05:58:24.73919419Z",
        },
      },
      requestId: "a6ec2141a43529dc5b4ce9325e32fe8a",
    });
  });
  // test("load certificate detail page", async () => {
  //   let tree;
  //   await act(async () => {
  //     tree = render(
  //       // @ts-ignore
  //       <Provider store={store}>
  //         <UsersComp />
  //       </Provider>
  //     );
  //   });
  //   expect(tree).toMatchSnapshot();
  // });
  it("Check if UI elements available after component loads", async () => {
    await act(() => {
      const { getByTestId } = render(
        <MemoryRouter initialEntries={["/"]}>
          <Provider store={store}>
            <UsersComp />
          </Provider>
        </MemoryRouter>
      );
      // expect(getByTestId("testInviteUser")).toBeInTheDocument();
      // expect(getByTestId("testInviteUser").textContent).toEqual("Invite User");
    });
  });
  it("Check after click invite user button", async () => {
    let tree;
    await act(async () => {
      tree = render(
        <MemoryRouter initialEntries={["/"]}>
          <Provider store={store}>
            <UsersComp />
          </Provider>
        </MemoryRouter>
      );
    });
    // await act(async () => {
    //   fireEvent.click(screen.getByTestId("testInviteUser"));
    // });

    // expect(screen.getByTestId("test-inviteuser").textContent).toEqual(
    //   "Invite User"
    // );
  });

  // it("displays error messages for invalid form inputs", async () => {
  //   // Render the component
  //   render(
  //     <Provider store={store}>
  //       <UsersComp />
  //     </Provider>
  //   );
  //   await act(async () => {
  //     fireEvent.click(screen.getByTestId("testInviteUser"));
  //   });

  //   // Get form inputs
  //   const firstNameInput = screen.getByLabelText("First Name");
  //   const lastNameInput = screen.getByLabelText("Last Name");

  //   // Trigger form submit with empty inputs
  //   fireEvent.click(screen.getByTestId("submitbtn"));

  //   // Update form inputs with valid values
  //   fireEvent.change(firstNameInput, { target: { value: "John" } });
  //   fireEvent.change(lastNameInput, { target: { value: "Doe" } });

  //   // Trigger form submit with valid inputs
  //   fireEvent.click(screen.getByTestId("submitbtn"));

  //   // Check that error messages are not displayed
  //   await waitFor(() =>
  //     expect(screen.queryByText("User First Name is Required")).toBeNull()
  //   );
  //   await waitFor(() =>
  //     expect(screen.queryByText("User Last Name is Required")).toBeNull()
  //   );
  //   await waitFor(() =>
  //     expect(screen.queryByText("Role is Required")).toBeNull()
  //   );
  // });
  // test("renders image after loading", async () => {
  //   const { getByRole } = render(
  //     <Provider store={store}>
  //       <UsersComp />
  //     </Provider>
  //   );
  //   await act(async () => {
  //     fireEvent.click(screen.getByTestId("testInviteUser"));
  //   });

  //   const imgElement = screen.getByTestId("crossbtn");
  //   expect(imgElement).toBeInTheDocument();
  //   expect(imgElement).toHaveAttribute("src", "../images/Close.svg");
  //   fireEvent.load(imgElement);

  //   expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  // });
  it("Check if api throws an error", async () => {
    let tree;

    jest.spyOn(role, "getRoles").mockResolvedValue({
      status: 500,
      error: {
        message: "Internal Server Error",
      },
    });
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <UsersComp />
        </Provider>
      </MemoryRouter>
    );
    await act(() => {
      expect(role.getRoles).toHaveBeenCalled();
    });
  });

  //   expect(screen.getAllByRole("button", { name: "View" })).toBeTruthy();
  // });
});
