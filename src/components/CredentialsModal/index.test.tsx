/* eslint-disable @typescript-eslint/no-redeclare */
import React from "react";
import * as clients from "services/api/clients.api";
// @ts-ignore
import {
  render,
  cleanup,
  fireEvent,
  act,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import store from "app/store";
import PermissionContext from "services/PermissionManager/PermissionContext";
import CredentialsModal from "./index";

const apiPermisssions = {
  hub: {
    entities: ["patch"],
    "users/:id": ["get"],
    disciplines: ["get"],
    territories: ["get"],
    organisations: ["get"],
    transactionLogs: ["get"],
    "organisations/:id": ["get"],
    "transactionLogs/:id": ["get"],
    "organisations/:id/users": ["get"],
    transactionStatusSummary: ["get"],
    transactionLogChannelSummary: ["get"],
    "organisations/:id/disciplines": ["get"],
    "organisations/:id/geographies": ["get"],
    "organisations/:id/userDisciplines": ["get"],
  },
  account: {
    roles: ["get", "post"],
    users: ["get", "post"],
    clients: ["get"],
    signout: ["delete"],
    streams: ["get"],
    userRole: ["get"],
    "roles/:id": ["get", "post", "patch"],
    "users/:id": ["get", "post", "patch", "delete"],
    clientSync: ["post"],
    "clients/:id": ["get", "post", "patch", "delete"],
    credentials: ["get", "post"],
    "userRole/:id": ["delete"],
    userRoleToken: ["post"],
    "jsonschema/:id": ["get"],
    "credentials/:id": ["get", "post", "patch", "delete"],
    "roles/:id/menus": ["get"],
    "users/:id/roles": ["patch", "get", "post"],
    dashboardSummary: ["get"],
    "users/:id/status": ["patch"],
    clientLeaderboard: ["get"],
    clientRolesSummary: ["get"],
    clientUsersSummary: ["get"],
    "clients/:id/status": ["patch"],
    "users/:id/reinvite": ["post"],
    "credentials/:id/status": ["patch"],
    credentialStatusSummary: ["get"],
    credentialsChannelSummary: ["get"],
  },
  notification: {
    clientConfig: ["post"],
    clientConfigs: ["get", "patch"],
    clientConfigsAll: ["get"],
    serviceProviders: ["get"],
    "clientConfigs/:id": ["delete", "patch"],
  },
};
localStorage.setItem("apiPermission", JSON.stringify(apiPermisssions));
jest.mock("common/utils", () => ({
  firstLetterCaps: jest.fn(),
  getErrorMessage: jest.fn(),
  removeAllSpecialChar: jest.fn(),
  toggleModalStyles: jest.fn(),
  toggleServiceCheckboxForAllHttpCheckBoxes: jest.fn(),
}));

describe("Credentials add Component", () => {
  const setToggleModal = jest.fn();
  const toggleModal = true;
  const toggleStatus = jest.fn();
  const setToggleStatus = jest.fn();
  beforeEach(() => {
    jest.spyOn(clients, "ClientListService").mockResolvedValue({
      status: 200,
      data: {
        clients: [
          {
            id: 13,
            name: "rwsdrf",
            code: "rwsdrf",
            address: null,
            description: "",
            isActive: 1,
            createdAt: "2022-06-28T11:44:13Z",
            updatedAt: "2022-06-28T11:44:13Z",
          },
        ],
      },
      _pagination: {
        pageNumber: 1,
        pageOffset: 1,
        pageSize: 500,
        totalCount: 33,
        totalPages: 1,
        isFirst: 1,
        isLast: 1,
      },
      requestId: "8f1f85e9f915ea0d09c97b541e1716c9",
    });
  });
  // test("renders credentials modal", async () => {
  //   let tree;
  //   act(() => {
  //     tree = render(
  //       <Provider store={store}>
  //         <PermissionContext.Provider
  //           value={{
  //             isAllowedTo: jest.fn().mockReturnValue(Promise.resolve(true)),
  //             loggedInUserObjectContext: [
  //               {
  //                 path: "/dashboard",
  //                 title: "Dashbard",
  //               },
  //               {
  //                 path: "/users",
  //                 title: "Users",
  //               },
  //               {
  //                 path: "/credentials",
  //                 title: "Credentials",
  //               },
  //               {
  //                 child: [
  //                   {
  //                     path: "/transactionLogs",
  //                     title: "Transactional Logs",
  //                   },
  //                   {
  //                     url: "https://adh-watch-dev.heartblr.org/",
  //                     title: "NATS Monitoring",
  //                   },
  //                 ],
  //                 title: "Data Hub",
  //               },
  //               {
  //                 child: [
  //                   {
  //                     url: "https://adh-api-doc-dev.heartblr.org/dev/v1/index.html",
  //                     title: "Swagger Docs",
  //                   },
  //                 ],
  //                 title: "Documentation",
  //               },
  //               {
  //                 child: [
  //                   {
  //                     path: "/notifications/settings",
  //                     title: "Setting",
  //                   },
  //                 ],
  //                 title: "Notifications",
  //               },
  //             ],
  //           }}
  //         >
  //           <CredentialsModal
  //             setToggleModal={setToggleModal}
  //             toggleModal={toggleModal}
  //             toggleStatus={toggleStatus}
  //             setToggleStatus={setToggleStatus}
  //           />
  //         </PermissionContext.Provider>
  //       </Provider>
  //     );
  //   });
  //   expect(tree).toMatchSnapshot();
  // });

  test("enables save button when name, channel and permissions are selected", async () => {
    let tree;
    jest.mock("../../services/api/credentials.api", () => ({
      AddCredentials: jest.fn(),
    }));

    await act(async () => {
      tree = render(
        <Provider store={store}>
          <PermissionContext.Provider
            value={{
              isAllowedTo: jest.fn().mockReturnValue(Promise.resolve(true)),
              loggedInUserObjectContext: [
                {
                  path: "/dashboard",
                  title: "Dashbard",
                },
                {
                  path: "/users",
                  title: "Users",
                },
                {
                  path: "/credentials",
                  title: "Credentials",
                },
                {
                  child: [
                    {
                      path: "/transactionLogs",
                      title: "Transactional Logs",
                    },
                    {
                      url: "https://adh-watch-dev.heartblr.org/",
                      title: "NATS Monitoring",
                    },
                  ],
                  title: "Data Hub",
                },
                {
                  child: [
                    {
                      url: "https://adh-api-doc-dev.heartblr.org/dev/v1/index.html",
                      title: "Swagger Docs",
                    },
                  ],
                  title: "Documentation",
                },
                {
                  child: [
                    {
                      path: "/notifications/settings",
                      title: "Setting",
                    },
                  ],
                  title: "Notifications",
                },
              ],
            }}
          >
            <CredentialsModal
              setToggleModal={setToggleModal}
              toggleModal={toggleModal}
              toggleStatus={toggleStatus}
              setToggleStatus={setToggleStatus}
            />
          </PermissionContext.Provider>
        </Provider>
      );
    });
    expect(clients.ClientListService).toHaveBeenCalled();
    const closebutton = screen.getAllByLabelText("Close");
    expect(closebutton[0]).toBeInTheDocument();

    fireEvent.click(closebutton[0]);

    const credentialheading = screen.getByTestId("test-title");
    expect(credentialheading).toBeInTheDocument();

    const apiRadioButton = screen.getByLabelText("API");
    fireEvent.click(apiRadioButton);
    expect(apiRadioButton).toBeChecked();

    const nameInput = screen.getByLabelText("Credential Tooltip");
    fireEvent.change(nameInput, { target: { value: "jithin" } });

    const textareas = screen.getAllByLabelText("undefined api of account");
    fireEvent.click(textareas[0]);

    act(() => {
      const saveBtn = screen.getAllByText("Save");
      fireEvent.submit(saveBtn[0]);
    });

    await act(() => {
      fireEvent.click(screen.getByLabelText("cancel"));
    });
    expect(setToggleModal).toHaveBeenCalledWith(false);
  });
});
