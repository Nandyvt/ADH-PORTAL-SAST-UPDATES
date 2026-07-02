import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import * as notificationlist from "services/api/notification.api";
import Pagination from "components/Pagination";
import { Provider } from "react-redux";
import store from "app/store";
import NotificationsList from "./index";

jest.mock("common/utils", () => ({
  passAuiObject: jest.fn(),
  defaultValues: jest.fn(),
  filtersLabel: jest.fn(),
  highlightFilter: jest.fn(),
  togglePopover: jest.fn(),
  toggleModalStyles: jest.fn(),
  toggleAriaExpandedElipses: jest.fn(),
  closeActionPopoverOnFocusOut: jest.fn(),
}));

describe("NotificationsList", () => {
  test("renders notifications list", async () => {
    jest.spyOn(notificationlist, "NotificationsListService").mockResolvedValue({
      status: 200,
      data: {
        clients: [
          {
            id: 23,
            name: "ADH",
            createdAt: "2022-07-26T05:03:22Z",
            updatedAt: "2023-04-13T11:26:23Z",
            is_active: 0,
            types: [
              {
                id: 3,
                type: "HTTP",
                status: "ACTIVE",
                configId: 171,
              },
            ],
          },
          {
            id: 101,
            name: "Reliance",
            createdAt: "2022-12-28T11:00:25Z",
            updatedAt: "2022-12-28T11:00:25Z",
            is_active: 1,
            types: [
              {
                id: 3,
                type: "HTTP",
                status: "INACTIVE",
                configId: 154,
              },
            ],
          },
        ],

        _pagination: {
          pageNumber: 1,
          pageOffset: 1,
          pageSize: 20,
          totalCount: 12,
          totalPages: 1,
          isFirst: 1,
          isLast: 1,
        },
        requestId: "a3c7884a39db70a17a9a924b4ea21437",
      },
    });
    let tree;
    await act(async () => {
      tree = render(
        <Provider store={store}>
          <NotificationsList />
        </Provider>
      );
    });
    // expect(tree).toMatchSnapshot();
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    const button = screen.getByTestId("view-more");
    fireEvent.click(button);
    expect(notificationlist.NotificationsListService).toHaveBeenCalledTimes(1);
    const multiselectbutton = screen.getAllByTestId("multiselect-test");

    fireEvent.click(multiselectbutton[0]);
  });

  test("displays loading state while fetching notifications", async () => {
    jest.spyOn(notificationlist, "NotificationsListService").mockResolvedValue({
      status: 200,
      data: {
        clients: [
          {
            id: 23,
            name: "ADH",
            createdAt: "2022-07-26T05:03:22Z",
            updatedAt: "2023-04-13T11:26:23Z",
            is_active: 0,
            types: [
              {
                id: 3,
                type: "HTTP",
                status: "ACTIVE",
                configId: 171,
              },
            ],
          },
          {
            id: 101,
            name: "Reliance",
            createdAt: "2022-12-28T11:00:25Z",
            updatedAt: "2022-12-28T11:00:25Z",
            is_active: 1,
            types: [
              {
                id: 3,
                type: "HTTP",
                status: "INACTIVE",
                configId: 154,
              },
            ],
          },
        ],
      },
      _pagination: {
        pageNumber: 1,
        pageOffset: 1,
        pageSize: 20,
        totalCount: 12,
        totalPages: 1,
        isFirst: 1,
        isLast: 1,
      },
      requestId: "a3c7884a39db70a17a9a924b4ea21437",
    });
    let tree;
    await act(async () => {
      tree = render(
        <Provider store={store}>
          <NotificationsList />
        </Provider>
      );
    });

    const button1 = screen.getAllByText("Settings");
    fireEvent.click(button1[0]);
  });
  test("renders notifications list", async () => {
    jest.spyOn(notificationlist, "NotificationsListService").mockResolvedValue({
      status: 200,
      data: {
        clients: null,
      },
    });
    let tree;
    await act(async () => {
      tree = render(
        <Provider store={store}>
          <NotificationsList />
        </Provider>
      );
    });
    expect(notificationlist.NotificationsListService).toHaveBeenCalledTimes(1);
  });
});
