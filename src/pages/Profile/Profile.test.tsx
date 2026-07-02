import React from "react";
import store from "app/store";
import { Provider } from "react-redux";

import { render, cleanup, act } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import Loading from "./Profile";
import { useUsersList } from "./profileHook";

jest.mock("./profileHook");

const mockUseClientRect = useUsersList as jest.MockedFunction<
  typeof useUsersList
>;

const mockUserData = [
  {
    id: 29,
    name: "Super",
    email: "superadmin@mail.com",
    firstName: "Super",
    lastName: "Admin",
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
    ],
    createdAt: "2022-06-10T10:50:14Z",
    updatedAt: "2023-11-07T11:42:53Z",
  },
];
describe("Location Component", () => {
  // it("Check if it matches snapshot", async () => {
  //   let tree;
  //   mockUseClientRect.mockReturnValue({
  //     loading: false,
  //     error: false,
  //     users: mockUserData,
  //   });
  //   await act(async () => {
  //     tree = TestRenderer.create(
  //       <Provider store={store}>
  //         <Loading />
  //       </Provider>
  //     ).toJSON();
  //     expect(tree).toMatchSnapshot();
  //   });
  // });

  it("Check if UI elements available after componet loads", async () => {
    mockUseClientRect.mockReturnValue({
      loading: false,
      error: false,
      users: mockUserData,
    });

    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/profile"]}>
        <Provider store={store}>
          <Loading />
        </Provider>
      </MemoryRouter>
    );

    await act(async () => {
      expect(getByTestId("my-profile-heading")).toBeInTheDocument();
      expect(getByTestId("my-profile-heading").textContent).toEqual(
        "My Profile"
      );
      expect(getByTestId("test-roleheading")).toBeInTheDocument();
      expect(getByTestId("test-roleheading").textContent).toEqual("Roles");
    });
  });

  afterEach(cleanup);
});
